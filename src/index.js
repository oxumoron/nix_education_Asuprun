import * as http from "http";
import { readFile } from "node:fs";

const host = "localhost";
const port = 8000;

let indexFile;
let index;

const user = [
  {
    id: 1,
    username: "oxymoron",
    firstname: "Artem",
    lastname: "Suprun",
    email: "test@gmail.com",
    password: "test",
    phone: "123-45-67",
  },
];

const requestListener = function (req, res) {
  try {
    switch (req.url) {
      case "/user":
        userController(req, res);
        break;
      case "/":
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indexFile);
        break;
      default:
        if (req.url.split("/")[1] === "user") {
          userControllerHW1(req, res);
        } else {
          res.setHeader("Content-Type", "application/json");
          res.writeHead(404);
          res.end(`{code: 404, message: "Resource not found"}`);
        }
    }
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
};
let body;
function readData(req, func) {
  body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      func(body);
    });
}
function userController(req, res) {
  switch (req.method) {
    case "GET":
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(user));
      break;
    case "POST":
      readData(req, (body) => {
        user.push(JSON.parse(body));
      });
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(`{message: "saved"}`);
      break;
    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(`{code: 404, message: "Resource not found"}`);
  }
}
function userControllerHW1(req, res) {
  switch (req.method) {
    case "GET":
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      let found = user.find(
        (el) => el.username === req.url.split("/")[2]
      );
      res.end(JSON.stringify(found));
      break;
    case "POST":
      if (req.url.split("/")[2] === "createWithArray") {
        readData(req, (body) => {
          user.push(JSON.parse(body));
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(`{message: "saved"}`);
        break;
      }
    case "DELETE":
      readData(req, () => {
        index = user.findIndex(
          (el) => el.username === req.url.split("/")[2]
        );
        if (index >= 0) {
          user.splice(index, 1);
        }
      });
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(`{User deleted}`);
      break;
    case "PUT":
      readData(req, (body) => {
        index = user.findIndex((el) => el.username === req.url.split("/")[2]);
        if (index >= 0) {
            user[index] = JSON.parse(body);
        }
      });
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(`{message: "saved"}`);
      break;
    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(`{code: 404, message: "Resource not found"}`);
  }
}
const server = http.createServer(requestListener);

readFile(process.cwd() + "/src/resources/index.html", "utf8", (err, data) => {
  if (err) {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
    return;
  }
  indexFile = data;
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
});

//const {square, cube} = require('./hw1.js')

//console.log(square(3) + cube(3));
