const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });

const mongoose = require('mongoose');
const fs = require('fs').promises;

const Tour = require('./../models/tourModel');

const { DATABASE } = process.env;
console.log(`${__dirname}`);

mongoose
  .connect(DATABASE)
  .then(() => console.log('Conect to database'))
  .catch((err) => console.error(err));

const importData = async () => {
  try {
    const fileRead = await fs.readFile(`${__dirname}/tours.json`, 'utf-8');
    const data = JSON.parse(fileRead);
    const tours = await Tour.find();

    if (tours.length <= 0) {
      await Tour.create(data);
      console.log('Data imported');
    }

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
