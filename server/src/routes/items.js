const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const {
  getProducts,
  // searchItems
} = require('../controllers/controllers')
const {
  searchProd
} = require('../utills/search')


router.get('/', verifyToken, getProducts)
router.get('/:key', verifyToken, async function (req, res) {
  try {
    const data = await searchProd(req.params.key);
    res.status(200).json(data);
  } catch (e) {
    errorHandler(res, e)
  }
})


module.exports = router