const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.postTour);
tourRouter
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
