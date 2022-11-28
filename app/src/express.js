const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')

const path = require('path')
const cookieParser = require('cookie-parser')

const db = require('./connection/mongoDB.js')

const router = require('./routes/routes.js')
const items = require('./routes/items')

const app = express();
const host = "localhost";
// const port = 3000;
const port = process.env.PORT || 3000;

// Mongoose
db

// app.use(morgan('dev'));
// app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.resolve('app/css-img-js')))
app.use(cookieParser())

app.use('/api/auth', router)
app.use('/products', items)
app.use('', (req, res) => {
  res.redirect('/products/');
})

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});