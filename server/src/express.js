const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const db = require('./connection/mongoDB.js')

const router = require('./routes/routes.js')

const app = express();
const host = "localhost";
const port = 3000;

// Mongoose
db


app.use(passport.initialize())
require('./middleware/passport.js')(passport)

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/auth', router)

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});