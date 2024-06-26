const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTours).post(
  //tourController.checkBody,
  tourController.postTour
);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

router.route('/name/:name').get(tourController.getTourByName);

module.exports = router;
