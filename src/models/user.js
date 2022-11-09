const mongoose = require('mongoose')

const User = mongoose.Schema({
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