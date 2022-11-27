const mongoose = require('mongoose')

const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);