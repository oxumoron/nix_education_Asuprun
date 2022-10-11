import * as http from "http";
import { readFile } from "node:fs";
import csv from "csvtojson";
const host = "localhost";
const port = 8000;
const csvFilePath = process.cwd() + "/src/resource/device.csv";

const requestListener = function (req, res) {
  csv()
    .fromFile(csvFilePath)
    .then(
      (jsonObj) => {
        sendFile(jsonObj, res);
      },
      (err) => {
        if (err) {
          res.setHeader("Content-type", "application/json");
          res.writeHead(500);
          console.log(err);
          res.end(JSON.stringify(err));
          return;
        }
      }
    );
};

function sendFile(contents, res) {
  console.log(contents);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "localhost");
  res.writeHead(200);
  res.end(JSON.stringify(contents));
}

const server = http.createServer(requestListener);


server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});