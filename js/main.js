import {items} from './items.js';

const products = document.getElementById('products');
const productWrapper = document.querySelector('li.product__wrapper');

const newName = document.getElementById('product__name');
const newImage = document.getElementById('product__photo');
const newOrders = document.getElementById('product__orders');
const newPrice = document.getElementById('product__price');
const newReviews = document.getElementById('product__reviews');
const newStock = document.getElementById('product__stock');

items.forEach((el) => {
  let newCard = document.createElement("li");
  let id = el.id;
  newCard.classList = "product__wrapper";
  newCard.id = `${id}`;
  newImage.src = `./img/${el.imgUrl}`;
  newName.textContent = el.name;
  newStock.textContent = el.orderInfo.inStock;

  if(+newStock.textContent === 0){
    newStock.classList.add('nostock')
  }
  newPrice.textContent = el.price;
  newOrders.textContent = Math.floor(300 + 700 * Math.random());
  newReviews.textContent = el.orderInfo.reviews;
  newCard.innerHTML = productWrapper.innerHTML;
  products.appendChild(newCard);
});


const colList = document.getElementById('color-cat__list');
const memList = document.getElementById('memory-cat__list');
const osList = document.getElementById('os-cat__list');


let colorAll = [];
let memoryAll = [];
let osAll = [];

items.map(item => {
  colorAll.push(...item.color);
  memoryAll.push(item.storage);
  osAll.push(item.os)
})

colorAll = [... new Set(colorAll)];
memoryAll = [... new Set(memoryAll)];
osAll = [... new Set(osAll)];

colorAll.map(elem => {
  let newCol = document.createElement("li");
      newCol.classList.add('cat__item');
      newCol.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `

      colList.appendChild(newCol);
});

memoryAll.map(elem => {
  let newMem = document.createElement("li");
      newMem.classList.add('cat__item');
      newMem.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `

      memList.appendChild(newMem);
});

osAll.map(elem => {
  let newOs = document.createElement("li");
      newOs.classList.add('cat__item');
      newOs.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `

      osList.appendChild(newOs);
});

const accordBtn = document.querySelector('.accord__icon');
const accord = document.querySelector('.accord');


accordBtn.addEventListener('click', (event) => {
  accord.classList.toggle('accord--active');
  event.currentTarget.classList.toggle('active');
});



// console.log(newStock.textContent);

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

const popup = document.getElementById('product__modal');
const productWrappers = document.querySelectorAll('li.product__wrapper');
const tagBody = document.querySelector('body')

productWrappers.forEach((item) => {
  item.addEventListener('click', () => {
    popup.classList.add('modal__active')
    tagBody.classList.add('hidden');
      
      const popupImg =  document.getElementById('popup-img');
      const popupReview =  document.getElementById('col__review');
      const popupOrders =  document.getElementById('col__orders');
      const popupName =  document.getElementById('col__title');
      const popupColor =  document.getElementById('col-color');
      const popupOs =  document.getElementById('col-os');
      const popupChip =  document.getElementById('col-chip');
      const popupHeight =  document.getElementById('col-height');
      const popupWidth =  document.getElementById('col-width');
      const popupDepth =  document.getElementById('col-depth');
      const popupWeight =  document.getElementById('col-weight');
      const popupPrice =  document.getElementById('col-price');
      const popupStock =  document.getElementById('col-stock');

      items.find((el) => {
        if(+el.id === +item.id) {
        popupImg.src = `./img/${el.imgUrl}`;
        popupReview.textContent = el.orderInfo.reviews;
        popupOrders.textContent = el.orderInfo.inStock;
        popupName.textContent = el.name;
        popupColor.textContent = el.color;
        popupOs.textContent = el.os;
        popupChip.textContent = el.chip.name;
        popupHeight.textContent = el.size.height;
        popupWidth.textContent = el.size.width;
        popupDepth.textContent = el.size.depth;
        popupWeight.textContent = el.size.weight;
        popupPrice.textContent = el.price;
        popupStock.textContent = el.orderInfo.inStock;
      }
    });


    popup.onmousedown = function (e) {
        let target = e.target;
        let modalContent = popup.getElementsByClassName('modal__inner')[0];
        if (e.target.closest('.' + modalContent.className) === null) {
          this.classList.remove('modal__active');
          tagBody.classList.remove('hidden');
        }
      };
    }
)})