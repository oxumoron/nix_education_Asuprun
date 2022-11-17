const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const express = require('express');
const searchProducts = require('../utills/search');
const products = require('../models/products.js');

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

module.exports.getProducts = async function (req, res) {
  try {
    const items = await products.find();
    res.status(200).json(items);
  } catch (e) {
    errorHandler(res, e)
  }
}