// import fs from 'fs';
// import {
//   ModelContact
// } from '../models/model.js';

// const filePath = process.cwd() + "/src/resource/contacts.json";


// let rawData = fs.readFileSync(filePath);
// let contacts = JSON.parse(rawData);


// export const getAllContacts = function () {
//   contacts.map(contact => {
//     const newContact = new ModelContact({
//       name: contact.name,
//       email: contact.email,
//       phone: contact.phone
//     })
//     newContact.save()
//   })
//   console.log('All users created');
// }

// // getAllContacts