const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const products = require('../models/products.js');
const path = require('path');
const errorHandler = require('../utills/errorHandler.js');

module.exports.getFirstPage = async function (req, res) {
  try {
    // const items = await products.find();
    res.status(200).sendFile(path.resolve('app/html/index.html'));
    // res.status(200).sendFile(path.resolve('app/html/index.html')) && res.json(items);
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getProducts = async function (req, res) {
  try {
    res.status(200).send(123)
    const items = await products.find();
    // res.status(200).sendFile(path.resolve('app/html/index.html'));
    // res.status(200).json(items);
  } catch (e) {
    errorHandler(res, e)
  }
}