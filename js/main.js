import {items} from './items.js';

const products = document.getElementById('products');
const productWrapper = document.querySelector('li.product__wrapper');

const newName = document.getElementById('product__name');
const newImage = document.getElementById('product__photo');
const newOrders = document.getElementById('product__orders');
const newPrice = document.getElementById('product__price');
const newReviews = document.getElementById('product__reviews');
const newStock = document.getElementById('product__stock');
const like = document.getElementById('like');
like.addEventListener('click', (filled) => like.classList.toggle('filled'));
console.log(like);


items.forEach((el) => {
  let newCard = document.createElement("li");
  newCard.classList = "product__wrapper";
  newImage.src = `./img/${el.imgUrl}`;
  newName.textContent = el.name;
  newStock.textContent = el.orderInfo.inStock;
  if(el.orderInfo.inStock === 0){
    newStock.classList.add('nostock')
  }
  newPrice.textContent = el.price;
  newOrders.textContent = Math.floor(300 + 700 * Math.random());
  newReviews.textContent = el.orderInfo.reviews;
  newCard.innerHTML = productWrapper.innerHTML;
  products.appendChild(newCard);
});
// console.log(document.getElementById('like'));


// if (localStorage.prompt1) {
//   document.getElementById('input').value = localStorage.prompt1;
// }else{
//   localStorage.prompt1
// }
// localStorage.prompt1 = prompt('Enter user name')

// let result = new Promise((resolve, reject) => {
   
//   setTimeout(() => {
//        resolve(value);
//      else
//        reject(value);
//    }, 1000);
//   });
  
//   result
//     .then(result => console.log('Success: ', result))
//     .catch(error => console.log('Error: ', error))
//     .finally(() => console.log('JavaScript Promise finished'));