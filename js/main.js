import {items} from './items.js';

const products = document.getElementById('products');
const productWrapper = document.querySelector('li.product__wrapper');

const newName = document.getElementById('product__name');
const newImage = document.getElementById('product__photo');
// const orders = Math.floor(300 + 700 * Math.random());
const newOrders = document.getElementById('product__orders');
const newPrice = document.getElementById('product__price');
const newReviews = document.getElementById('product__reviews');
const newStock = document.getElementById('product__stock');

// items.forEach(item => {
//   newCard.cont
// })

items.forEach((el) => {
  let newCard = document.createElement("li");
  newCard.classList = "product__wrapper";
  newImage.src = `./img/${el.imgUrl}`;
  newName.textContent = el.name;
  newStock.textContent = el.orderInfo.inStock;
  newPrice.textContent = el.price;
  newOrders.textContent = Math.floor(300 + 700 * Math.random());
  newReviews.textContent = el.orderInfo.reviews;
  newCard.innerHTML = productWrapper.innerHTML;
  products.append(newCard);
});

// console.log(newName);