const products = require("../models/products");

const searchProducts = (s = '') => products.find({
  name: {
    $regex: s,
    $options: 'i'
  }
});

module.exports = {
  searchProducts
};