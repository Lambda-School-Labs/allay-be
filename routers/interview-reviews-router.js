const router = require('express').Router();

const IRevs = require('../helpers/interview-reviews-model');

//************* GET ALL COMPANY REVIEWS ***************//
router.get('/', (req, res) => {
  IRevs.findInterviewReviews()
    .then(reviews => {
      res.json(reviews);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting all interview reviews.'
      });
    });
});
//************* GET ALL COMPANY REVIEW BY FILTER ***************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  IRevs.findInterviewReviewBy(filter)
    .then(review => {
      console.log(review);
      res.json(review);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting an interview by a filter.'
      });
    });
});

//************* GET ALL COMPANY REVIEW BY USER ID ***************//

router.get('/:id', (req, res) => {
  const { id } = req.params;

  IRevs.findInterviewReviewById(id)
    .then(userReview => {
      res.json(userReview);
    })
    .catch(err => {
      res.status(500).json(err, {
        error: 'Error getting interview review by user ID.'
      });
    });
});

module.exports = router;