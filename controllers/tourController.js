const fs = require('fs');
const Tour = require('./../models/tourModel');

// const filePath = `${__dirname}/../data/tours.json`;

// let tours = [];

// try {
//   tours = JSON.parse(fs.readFileSync(filePath));
// } catch (error) {
//   console.log(error);
// }

let tours = Tour.find();

// exports.checkID = (req, res, next, val) => {
//   console.log(`ID: ${val}`);

//   const tour = tours.find((e) => e.id == req.params.id);
//   if (!tour)
//     return res.status(404).json({
//       status: 'fail',
//       message: `Tour with id ${req.params.id} not found!`,
//     });

//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price)
//     return res
//       .status(400)
//       .json({ status: 'fail', message: 'Name and price required' });
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      name: req.name,
      requestedAt: req.requestedAt,
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
};

exports.getTourByName = async (req, res) => {
  const tour = await Tour.find({ name: req.params.name });
  res.send(tour);
};

exports.postTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  // tours = tours.filter((e) => e.id != req.params.id);
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
