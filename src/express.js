import fs from 'fs';
import express from 'express';
import * as http from "http";

const app = express();


const host = 'localhost';
const port = 3000;
const filePath = process.cwd() + "/src/resource/contacts.json";

let rawData = fs.readFileSync(filePath);
let contacts = JSON.parse(rawData);

const listContacts = function () {
  let rawData = fs.readFileSync(filePath);
  let contacts = JSON.parse(rawData);
  return contacts;
};

const getById = function (id) {
  let result = {};
  const err = {
    code: 404,
    message: "Id not found"
  };
  contacts.map(contact => {
    if (parseInt(id) === contact.id) {
      result = {
        ...contact
      };
    } else {
      result = {
        ...err
      }
    }
  })
  return result;
}

// function userControllerHW1(req, res) {
//   console.log(`Server listens http://${host}:${port}`);
//   switch (req.method) {
//     case "GET":
//       res.setHeader("Content-Type", "application/json");
//       res.writeHead(200);
//       let found = contacts.find(
//         (el) => el.id === req.url.split("/")[2]
//       );
//       res.end(JSON.stringify(found));
//       break;
// case "DELETE":
//   readData(req, () => {
//     index = user.findIndex(
//       (el) => el.username === req.url.split("/")[2]
//     );
//     if (index >= 0) {
//       user.splice(index, 1);
//     }
//   });
//   res.setHeader("Content-Type", "application/json");
//   res.writeHead(200);
//   res.end(`{User deleted}`);
//   break;
// case "PUT":
//   readData(req, (body) => {
//     index = user.findIndex((el) => el.username === req.url.split("/")[2]);
//     if (index >= 0) {
//       user[index] = JSON.parse(body);
//     }
//   });
//   res.setHeader("Content-Type", "application/json");
//   res.writeHead(200);
//   res.end(`{message: "saved"}`);
//   break;
// default:
// res.setHeader("Content-Type", "application/json");
// res.writeHead(404);
// res.end(`{code: 404, message: "Resource not found"}`);
// }
// }



app.get('/home', (req, res) => {

})

app.get('/about', (req, res) => {
  res.status(200).type('text/plain')
  res.send('About page')
})

// TASK 1
app.get('/api/contacts', (req, res) => {
  res.status(200).type('text/plain');
  res.send(listContacts());
})

app.get('/api/contacts/:contactId', (req, res) => {
  res.status(200).type('text/plain');
  res.send(getById(req.params.contactId));
})

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

app.listen(port, host, function (req, res) {
  console.log(`Server listens http://${host}:${port}`);
})