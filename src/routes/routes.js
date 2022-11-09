const express = require('express')
const controllers = require('../controllers/controllers.js')
const controller = require('../controllers/auth.js')
const router = express.Router();
const passport = require('passport')

router.get('/try', passport.authenticate('jwt', {
  session: false
}), controllers.contactsAll)
router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router