const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

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

// 2) READING FILE
const filePath = `${__dirname}/data/tours.json`;
const baseURL = '/api/v1';

let tours = [];

let users = [
  {
    id: 1,
    name: 'Jennifer Hardy',
    email: 'jennifer@example.com',
    role: 'guide',
    active: true,
    photo: 'user-6.jpg',
  },
];

try {
  tours = JSON.parse(fs.readFileSync(filePath));
} catch (error) {
  console.log(error);
}

// 3) FUNCTION /TOURS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    name: req.name,
    requestedAt: req.requestedAt,
    results: tours.length,
    data: { tours },
  });
};

const getTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((e) => e.id == id);
  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: `Tour with id ${id} not found!` });
  res.status(200).json({ status: 'success', data: { tour } });
};

const postTour = (req, res) => {
  console.log(req.body);

  const newItem = Object.assign(
    { id: tours[tours.length - 1].id + 1 },
    req.body
  );

  tours.push(newItem);

  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    if (err) return console.log(err);
    res.status(201).json({
      status: 'success',
      data: { tour: newItem },
    });
  });
};

const patchTour = (req, res) => {
  res.status(200).json({ status: 'success', data: { tours: 'deu certo' } });
};

const deleteTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((e) => e.id == id);

  if (!tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  tours = tours.filter((e) => e.id != id);

  res.status(204).json({ status: 'success', data: null });
};

// app.get(`${baseURL}/tours`, getAllTours);
// app.get(`${baseURL}/tours/:id`, getById);
// app.post(`${baseURL}/tours`, postTour);
// app.patch(`${baseURL}/tours/:id`, patchTour);
// app.delete(`${baseURL}/tours/:id`, deleteTour);

// 4) FUNCTIONS /USERS
const getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: { users } });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = users.find((e) => e.id == id);

  if (!user)
    return res.status(404).json({ status: 'fail', message: 'user dont found' });

  res.status(200).json({ status: 'success', data: { user } });
};

const postUser = (req, res) => {
  const user = Object.assign({ id: users.length + 1 }, req.body);
  users.push(user);
  res.status(201).json({ status: 'success', data: { user } });
};

const deleteUser = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  if (users.length < id || isNaN(id))
    return res.status(404).json({ status: 'fail', message: 'user dont found' });

  users = users.filter((user) => user.id != id);
  res.status(204).json({ status: 'success', data: null });
};

// 5) ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(postTour);
tourRouter.route('/:id').get(getTourById).patch(patchTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(postUser);
userRouter.route('/:id').get(getUserById).delete(deleteUser);

app.use(`${baseURL}/tours`, tourRouter);
app.use(`${baseURL}/users`, userRouter);

// 6) START SERVER
app.listen(3000, '127.0.0.1', () => {
  console.log('listening...');
});
