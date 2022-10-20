import fs from 'fs';
const filePath = process.cwd() + "/src/resource/contacts.json";

let rawData = fs.readFileSync(filePath);
let contacts = JSON.parse(rawData);


export const contactsAll = function (req, res) {
  const listContacts = function (req, res) {
    return JSON.stringify(contacts);
  };
  res.status(200);
  res.send(listContacts())
}

export const contactId = function (req, res) {
  const getById = contacts.find(contact => contact.id === parseInt(req.params.contactId));
  if (!getById) res.status(404).send({
    "message": "Not found"
  });
  res.send(getById);
}

export const createContact = function (req, res) {
  if (!req.body.name) {
    res.status(400).send({
      "message": "Missing required name"
    })
  } else if (!req.body.email) {
    res.status(400).send({
      "message": "Missing required email"
    })
  } else if (!req.body.phone) {
    res.status(400).send({
      "message": "Missing required phone"
    })
  } else {
    const contact = {
      id: contacts.length + 1,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }
    contacts.push(contact);
    res.status(201).send(contact);
  }
}