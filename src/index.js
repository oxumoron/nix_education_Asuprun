import * as http from "http";
import fs from 'fs';
import express from 'express';
import contacts from './contacts.js';

const router = express.Router();
const host = "localhost";
const port = 8000;
const filePath = process.cwd() + "/src/resource/contacts.json";
const app = express();

// const requestListener = function (req, res) {
//   let rawData = fs.readFileSync(filePath);
//   let contacts = JSON.parse(rawData);
//   res.end(JSON.stringify(contacts));
// };


// const server = http.createServer(requestListener);


// server.listen(port, host, () => {
//   console.log(`Server is running on http://${host}:${port}`);
// });

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(port, function () {
//   console.log(`Server is running on http://${host}:${port}`);
// });

// ...
app.use('/contacts', contacts);