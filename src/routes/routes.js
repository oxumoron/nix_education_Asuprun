// import express from 'express';
// import {
//   contactId,
//   createContact,
//   updateContact,
//   delContact,
//   contactsAll
// } from '../controllers/controllers.js';
// import {
//   login,
//   register
// } from '../controllers/auth.js';
const express = require('express')
const contactId = require('../controllers/controllers.js')
const createContact = require('../controllers/controllers.js')
const updateContact = require('../controllers/controllers.js')
const delContact = require('../controllers/controllers.js')
const controllers = require('../controllers/controllers.js')
const controller = require('../controllers/auth.js')
const router = express.Router();
const passport = require('passport')

router.get('/try', passport.authenticate('jwt', {
  session: false
}), controllers.contactsAll)
// router.post('/contacts', createContact)
// router.get('/contacts/:contactId', contactId)
// router.put('/contacts/:contactId', updateContact)
// router.delete('/contacts/:contactId', delContact)
router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router