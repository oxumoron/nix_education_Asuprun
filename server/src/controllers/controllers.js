const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const products = require('../models/products.js');
const searchProd = require('../utills/search');
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
    console.log(e);
    res.status(400).json({
      message: "Registration error"
    });
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
    console.log(e);
    res.status(400).json({
      message: "Registration error"
    });
  }
}

// module.exports.getProducts = async function (req, res) {
//   const products = await searchProducts(req.query.search);
//   res.status(200).json(products);
// }

// module.exports.searchItems = async function (req, res) {
//   try {
//     const data = await searchProd(req.params.key);
//     res.status(200).json(data);
//   } catch (e) {
//     errorHandler(res, e)
//   }
// }

module.exports.getProducts = async function (req, res) {
  try {
    const items = await products.find();
    res.status(200).json(items);
  } catch (e) {
    errorHandler(res, e)
  }
}