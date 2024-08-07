const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const baseURL = '/api/v1';

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello my middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  req.name = 'Sara';
  next();
});

// app.get(`${baseURL}/tours`, getAllTours);
// app.get(`${baseURL}/tours/:id`, getById);
// app.post(`${baseURL}/tours`, postTour);
// app.patch(`${baseURL}/tours/:id`, patchTour);
// app.delete(`${baseURL}/tours/:id`, deleteTour);

// 5) ROUTES
app.use(`${baseURL}/tours`, tourRouter);
app.use(`${baseURL}/users`, userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.url}`
  })
})

module.exports = app;