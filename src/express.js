import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';


import {
  router
} from './routes/routes.js';

const app = express();
const host = "localhost";
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/', router)
app.post('/process_post', function (req, res) {
  res.status(200).json({
    response: {
      id: req.body.id,
      token: req.body.token,
      geo: req.body.geo
    }
  })
})
const server = app.listen(port, function () {
  console.log(`Server is running on http://${host}:${port}`);
});