// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import User from "../models/user.js"
// import {
//   keys
// } from "../config/config.js"

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const keys = require('../config/config.js')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  })

  if (candidate) {
    const passpordRes = bcrypt.compareSync(req.body.password, candidate.password)
    if (passpordRes) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
        // need create config
      }, keys.jwt, {
        expiresIn: 60 * 60
      })
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: "Пароли не совпадают,попробуйте снова"
      })
    }
  } else {
    res.status(404).json({
      message: "Пользователь с таким email не найден"
    })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  })

  if (candidate) {
    res.status(409).json({
      message: 'Такой email занят. Попробуйте другой.'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json({
        user
      })
    } catch (e) {
      // 
    }
  }
}