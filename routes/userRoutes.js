const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.postUser);
userRouter
  .route('/:id')
  .get(userController.getUserById)
  .delete(userController.deleteUser);

module.exports = userRouter;
