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

// import {
//   getAllContacts
// } from './controllers/controllers.js';

const app = express();
const host = "localhost";
const port = 3000;

// Mongoose
db
// get all contacts from file
// getAllContacts()

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/', router)

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});