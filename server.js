const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose = require('mongoose');

const { PORT, HOST, DATABASE } = process.env;

mongoose
  .connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conect to database'))
  .catch((err) => console.log('Error', err));

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 500,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));

app.listen(PORT, HOST, () => {
  console.log('listening...');
});
