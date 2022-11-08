import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
// import {
//   authenticate
// } from './authenticate.js';

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
import {
  passport as midPas
} from './middleware/passport.js';

const app = express();
const host = "localhost";
const port = 3000;

// Mongoose
db
// get all contacts from file
// getAllContacts()

app.use(passport.initialize())
midPas(passport)
// require('./middleware/passport')(passport)

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/auth', router)

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});