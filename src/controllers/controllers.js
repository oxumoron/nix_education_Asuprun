import fs from 'fs';
import {
  ModelContact
} from '../models/model.js';

const filePath = process.cwd() + "/src/resource/contacts.json";

let rawData = fs.readFileSync(filePath);
let contacts = JSON.parse(rawData);

// export const getAllContacts = function () {
//   contacts.map(contact => {
//     const candidate = ModelContact.findOne({
//       email: contact.email
//     })
//     if (candidate) {
//       console.log('Contact already exists');
//     } else {
//       const newContact = new ModelContact({
//         // id: contacts.length + 1,
//         name: contact.name,
//         email: contact.email,
//         phone: contact.phone
//       })
//       newContact.save()
//     }
//   })
//   console.log('All users created');
// }

export const contactsAll = function (req, res) {
  const listContacts = function (req, res) {
    return JSON.stringify(contacts);
  };
  res.status(200);
  res.send(listContacts())
}

export const contactId = async (req, res) => {
  const candidate = await ModelContact.findOne({
    _id: req.params.contactId
  });
  if (!candidate) {
    res.status(404).send({
      "message": "Not found"
    })
  } else {
    res.send(candidate);
  }
}

export const createContact = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      "message": "Missing required name"
    });
  } else if (!req.body.email) {
    res.status(400).send({
      "message": "Missing required email"
    });
  } else if (!req.body.phone) {
    res.status(400).send({
      "message": "Missing required phone"
    });
  } else {
    const candidate = await ModelContact.findOne({
      email: req.body.email
    });
    if (candidate) {
      res.status(409).send('Contact already exists');
    } else {
      const contact = new ModelContact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      });
      contact.save().then(() => console.log('User created'));
      res.status(201).send(contact);
    }
  }
}

export const updateContact = async (req, res) => {
  ModelContact.findByIdAndUpdate(req.params.contactId, {
      "name": req.body.name,
      "email": req.body.email,
      "phone": req.body.phone
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return res.send('Succesfully saved.');
    })
}

export const delContact = function (req, res) {
  ModelContact.findByIdAndDelete(req.params.contactId,
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return res.send('Succesfully deleted.');
    })
}