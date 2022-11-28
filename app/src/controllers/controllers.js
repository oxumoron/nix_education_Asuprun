const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const products = require('../models/products.js');
const path = require('path');
const errorHandler = require('../utills/errorHandler.js');

module.exports.userCreate = async function registration(req, res) {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    const candidate = await User.findOne({
      email
    });
    if (candidate) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    return res.json({
      message: "User has been registred"
    });
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.userSign = async function login(req, res) {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    const candidate = await User.findOne({
      email
    });
    if (candidate) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    return res.json({
      message: "User has been registred"
    });
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getProducts = async function (req, res) {
  try {
    const items = await products.find();
    res.status(200).sendFile(path.resolve('app/html/index.html'));
    res.send(items);
    // res.status(200).sendFile(path.resolve('app/html/index.html')).json(items);
  } catch (e) {
    errorHandler(res, e)
  }
}