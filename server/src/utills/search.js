const products = require("../models/products");

const searchProd = (field = '') => products.find({
  name: {
    $regex: field,
    $options: 'i'
  }
});

module.exports = {
  searchProd
};