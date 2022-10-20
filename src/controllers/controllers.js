import fs from 'fs';
const filePath = process.cwd() + "/src/resource/contacts.json";

let rawData = fs.readFileSync(filePath);
let contacts = JSON.parse(rawData);

const listContacts = function (req, res) {
  return JSON.stringify(contacts);
};

const getById = function (id) {
  let result = {};
  const err = {
    "message": "Not found"
  };
  contacts.map(contact => {
    if (parseInt(id) === contact.id) {
      console.log(parseInt(id) === contact.id);
      result = {
        ...contact
      }
    } else {
      result = {
        ...err
      }
    }
  })
  return result;
}

export const contactsAll = function (req, res) {
  res.status(200);
  res.send(listContacts())
}

export const contactId = function (req, res) {
  if (getById(req.params.contactId).message) {
    res.status(404);
    res.send(getById(req.params.contactId));
  } else {
    res.status(200);
    res.send(getById(req.params.contactId));
  }
}