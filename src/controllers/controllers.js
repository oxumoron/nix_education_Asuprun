import fs from 'fs';
const filePath = process.cwd() + "/src/resource/contacts.json";

const listContacts = function (req, res) {
  let rawData = fs.readFileSync(filePath);
  let contacts = JSON.parse(rawData);
  return JSON.stringify(contacts);
};

export const contacts = function (req, res) {
  res.status(200);
  res.send(listContacts())
}

export const contactId = function (req, res) {
  res.status(200);
  res.send(listContacts())
}