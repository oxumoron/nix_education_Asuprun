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

export const updateContact = function (req, res) {
  console.log(Object.keys(req.body));
  const user = contacts.find(contact => contact.id === parseInt(req.params.contactId));
  if (!user) {
    res.status(404).send({
      "message": "Not found"
    })
  } else if (Object.keys(req.body).length == 0) {
    res.status(400).send({
      "message": "Missing fields"
    })
  } else {
    Object.keys(req.body).map(prop => {
      switch (prop) {
        case 'name':
          user.name = req.body.name;
          break;
        case 'email':
          user.email = req.body.email;
          break;
        case 'phone':
          user.phone = req.body.phone;
          break;
      }
    })
    res.send(user);
  }
}

export const delContact = function (req, res) {
  const removeContact = contacts.find(contact => contact.id === parseInt(req.params.contactId));
  if (!removeContact) {
    res.status(404).send({
      "message": "Contact not found"
    })
  } else {
    const index = contacts.indexOf(removeContact);
    contacts.splice(index, 1);
    res.status(200).send([removeContact, {
      "message": "Сontact deleted"
    }]);
  }
}