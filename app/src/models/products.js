const mongoose = require('mongoose')

const product = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  display: {
    type: Number,
    multipleOf: 0.01
  },
  color: [{
    type: String
  }],
  price: {
    type: Number
  },
  chip: {
    type: Object
  },
  ram: {
    type: Number
  },
  storage: {
    type: Number
  },
  touchId: {
    type: Boolean
  },
  faceId: {
    type: Boolean
  },
  wireless: [{
    type: String
  }],
  camera: {
    type: Object
  },
  audio: {
    type: Object
  },
  size: {
    type: Object
  },
  os: {
    type: String
  },
  InTheBox: [{
    type: String
  }],
  orderInfo: {
    type: Object
  },
})


module.exports = mongoose.model('product', product);