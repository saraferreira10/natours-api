const fs = require('fs');

const filePath = `${__dirname}/../data/tours.json`;

let tours = [];

try {
  tours = JSON.parse(fs.readFileSync(filePath));
} catch (error) {
  console.log(error);
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    name: req.name,
    requestedAt: req.requestedAt,
    results: tours.length,
    data: { tours },
  });
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((e) => e.id == id);
  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: `Tour with id ${id} not found!` });
  res.status(200).json({ status: 'success', data: { tour } });
};

exports.postTour = (req, res) => {
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

exports.patchTour = (req, res) => {
  res.status(200).json({ status: 'success', data: { tours: 'deu certo' } });
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((e) => e.id == id);

  if (!tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  tours = tours.filter((e) => e.id != id);

  res.status(204).json({ status: 'success', data: null });
};
