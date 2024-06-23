const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const filePath = `${__dirname}/data/tours.json`;
const baseURL = '/api/v1';

let tours = [];

try {
  tours = JSON.parse(fs.readFileSync(filePath));
} catch (error) {
  console.log(error);
}

app.get(`${baseURL}/tours`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.get(`${baseURL}/tours/:id`, (req, res) => {
  const { id } = req.params;
  const tour = tours.find((e) => e.id == id);
  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: `Tour with id ${id} not found!` });
  res.status(200).json({ status: 'success', data: { tour } });
});

app.post(`${baseURL}/tours`, (req, res) => {
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
});

app.listen(3000, '127.0.0.1', () => {
  console.log('listening...');
});
