const db = require('../data/dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  findUserReviews,
  addUser,
  updateUser,
  deleteUser
};

//Create some functions!

function findUsers() {
  return db('users');
}

function findUsersBy(filter) {
  return db('users').where(filter);
}

// function findUserById(id) {
// 	return db("users as u")
// 		.select("u.id", "u.username")
// 		.where({ id });
// }

function findUserById(userId) {
  return db('reviews as r')
    .where('r.user_id', userId)
    .join('users as u', 'r.user_id', 'u.id')
    .select('u.id', 'u.username')
    .then(result => {
      // console.log(result[0].id);
      return findUserReviews(result[0].id)
        .then(reviewArray => {
          // console.log(reviewArray)
          return { ...result[0], reviews: reviewArray };
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function findUserReviews(userId) {
  return db('reviews as r').where('r.user_id', userId);
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(([id]) => {
      return findUserById(id);
    });
}

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findUserById(id) : null));
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}
