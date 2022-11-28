const express = require('express')
const auth = require('../controllers/auth')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const {
  getProducts
} = require('../controllers/controllers')
const {
  body
} = require('express-validator')

router.post('/registration/',
  body('email').isEmail(),
  body('password').isLength({
    min: 3,
    max: 8
  }), auth.register)
router.post('/login/', auth.login)
// router.get('/items', verifyToken, getProducts)


module.exports = router