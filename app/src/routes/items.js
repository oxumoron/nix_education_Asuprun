const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const {
  getProducts,
  getFirstPage
} = require('../controllers/controllers')
const {
  searchProd
} = require('../utills/search')

router.get('', getFirstPage)
router.get('products/', getProducts)
// router.get('products/', verifyToken, getProducts)
router.get('products/:key', verifyToken, async function (req, res) {
  try {
    const data = await searchProd(req.params.key);
    res.status(200).sendFile(path.resolve('app/html/index.html')).json(data);
  } catch (e) {
    errorHandler(res, e)
  }
})


module.exports = router