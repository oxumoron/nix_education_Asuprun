import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import {
  db
} from './connection/mongoDB.js';

import {
  router
} from './routes/routes.js';


import {
  Genre
} from "./models/genre.js"
import {
  getAllContacts
} from './services/services.js';

const app = express();
const host = "localhost";
const port = 3000;

// Mongoose
db
// get all contacts from file
getAllContacts()

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/', router)

// Create an instance of model SomeModel
// const genre = new Genre({
//   name: "new name"
// });

// Save the new model instance, passing a callback
// genre.save((err) => {
//   if (err) return handleError(err);
//   // saved!
// });

// Genre.findOne().exec((err, data) => {
//   console.log('findOne', data);
// })

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});