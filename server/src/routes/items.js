const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const {
  getProducts
} = require('../controllers/controllers')


router.get('/', verifyToken, getProducts)
// router.get('/', getProducts)

// router.get('/', async (req, res) => {
//   res.status(200).json({
//     '123': '123'
//   });
// })



module.exports = router