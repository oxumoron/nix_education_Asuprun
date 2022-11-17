const express = require('express')
const auth = require('../controllers/auth')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const {
  getProducts
} = require('../controllers/controllers')

router.post('/registration', auth.register)
router.post('/login', auth.login)
router.get('/items', verifyToken, getProducts)


module.exports = router