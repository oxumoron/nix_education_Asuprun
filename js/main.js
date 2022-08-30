import {
  items
} from './items.js';

const products = document.getElementById('products');
const productWrapper = document.querySelector('li.product__wrapper');

const newName = document.getElementById('product__name');
const newImage = document.getElementById('product__photo');
const newOrders = document.getElementById('product__orders');
const newPrice = document.getElementById('product__price');
const newReviews = document.getElementById('product__reviews');
const newStock = document.getElementById('product__stock');


const createCards = function (card) {
  card.forEach((el) => {
    let newCard = document.createElement("li");
    let id = el.id;
    newCard.classList = "product__wrapper";
    newCard.id = `${id}`;
    newImage.src = `./img/${el.imgUrl}`;
    newName.textContent = el.name;
    newStock.textContent = el.orderInfo.inStock;

    if (+newStock.textContent === 0) {
      newStock.classList.add('nostock')
    }
    newPrice.textContent = el.price;
    newOrders.textContent = Math.floor(300 + 700 * Math.random());
    newReviews.textContent = el.orderInfo.reviews;
    newCard.innerHTML = productWrapper.innerHTML;
    products.appendChild(newCard);
  });
}
createCards(items)

const priceFrom = document.getElementById('price-from');
const priceTo = document.getElementById('price-to');

const allPrice = items.map(el => el.price);
const minPrice = Math.min.apply(null, allPrice);
const maxPrice = Math.max.apply(null, allPrice);

priceFrom.placeholder = minPrice;
priceTo.placeholder = maxPrice;



const colList = document.getElementById('color-cat__list');
const memList = document.getElementById('memory-cat__list');
const osList = document.getElementById('os-cat__list');
const disList = document.getElementById('display__cat-list');
const priceList = document.getElementById('price__cat-list');

let colorAll = [];
let memoryAll = [];
let osAll = [];

items.map(item => {
  colorAll.push(...item.color);
  memoryAll.push(item.storage);
  osAll.push(item.os)
})


colorAll = [...new Set(colorAll)];
memoryAll = [...new Set(memoryAll)];
osAll = [...new Set(osAll)];

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

    const popupImg = document.getElementById('popup-img');
    const popupReview = document.getElementById('col__review');
    const popupOrders = document.getElementById('col__orders');
    const popupName = document.getElementById('col__title');
    const popupColor = document.getElementById('col-color');
    const popupOs = document.getElementById('col-os');
    const popupChip = document.getElementById('col-chip');
    const popupHeight = document.getElementById('col-height');
    const popupWidth = document.getElementById('col-width');
    const popupDepth = document.getElementById('col-depth');
    const popupWeight = document.getElementById('col-weight');
    const popupPrice = document.getElementById('col-price');
    const popupStock = document.getElementById('col-stock');

    items.find((el) => {
      if (+el.id === +item.id) {
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
  })
})

// $(".cities_list input[type='checkbox']").on('change', function() {
//   console.log($(this).val());
//   console.log($(this).attr('id'));
// });


// const colList = document.getElementById('color-cat__list');
// const memList = document.getElementById('memory-cat__list');
// const osList = document.getElementById('os-cat__list');

const removeChildren = function (item) {
  while (item.firstChild) {
    item.removeChild(item.firstChild)
  }
}

const updateChildren = function (item, children) {
  let childreArr = [];
  removeChildren(item);
  for (let i = 0; i < children.length; i++) {
    childreArr.push(children[i]);
  }
  createCards(childreArr)
}

// const products = document.getElementById('products');
// const productsWrapper = document.querySelectorAll('li.product__wrapper');
const inputCol = colList.querySelectorAll("input");
const inputMem = memList.querySelectorAll("input");
const inputOs = osList.querySelectorAll("input");
const inputDisplay = disList.querySelectorAll("input");
const inputPrice = priceList.querySelectorAll("input");

let cardsArr = [];

for (let input of inputCol) {
  input.addEventListener('click', (event) => {
    filterCol(input);
  })
}

for (let input of inputPrice) {
  input.addEventListener('keyup', (event) => {
    if( event.code === 'Enter' ) {
      filterPrice(input);
    }
  })
}

for (let input of inputMem) {
  input.addEventListener('click', (event) => {
    filterMem(input);
  })
}

for (let input of inputOs) {
  input.addEventListener('click', (event) => {
    filterOs(input);
  })
}

for (let input of inputDisplay) {
  input.addEventListener('click', (event) => {
    filterDis(input);
  })
}

function filterCol(el) {
  let filteredColor = [];
  if (el.checked) {
    items.filter((e) => {     
        if (e.color.indexOf(el.id) > -1) {
          filteredColor.push(e)
        }
      updateChildren(products, filteredColor);
    })
  } else {
    updateChildren(products, items);
  }
}

function filterMem(el) {
  let filteredMem = [];
  if (el.checked) {
    items.filter((e) => { 
        if (e.storage === +el.id) {
          filteredMem.push(e)
        }
      updateChildren(products, filteredMem);
    })
  } else {
    updateChildren(products, items);
  }
}

function filterOs(el) {
  let filteredOs = [];
  if (el.checked) {
    items.filter((e) => {     
        if (e.os === el.id) {
          filteredOs.push(e)
      }
      updateChildren(products, filteredOs);
    })
  } else {
    updateChildren(products, items);
  }
}

function filterDis(el) {
  let filteredDis = [];
  if (el.checked) {
    items.filter((e) => {     
        if (el.id === `inch2_5`) {
          if(e.display >= 2 && e.display < 5){
            filteredDis.push(e)
          }
        }
        if (el.id === `inch_7`) {
          if(e.display >= 5 && e.display < 7){
            filteredDis.push(e)
          }
        }
        if (el.id === `inch7_12`) {
          if(e.display >= 7 && e.display < 12){
            filteredDis.push(e)
          }
        }
        if (el.id === `inch12_16`) {
          if(e.display >= 12 && e.display < 16){
            filteredDis.push(e)
          }
        }
        if (el.id === `more16`) {
          if(e.display > 16){
            filteredDis.push(e)
          }
        }
      updateChildren(products, filteredDis);
    })
  } else {
    updateChildren(products, items);
  }
}

let priceArr = [];
items.forEach(elem => {
    priceArr.push(elem)
  });
  priceArr = priceArr.sort((a, b) => {
    return a - b
  });

let itemsSortByPrice = [];
function sortArrByPrice() {
  return items.sort((prev, next) => {
    let prevB = prev.price;
    let nextB = next.price;
    return prevB - nextB;
  })
}
itemsSortByPrice = [...sortArrByPrice()];
// console.log(itemsSortByPrice);
function filterPrice() {
  let filteredPrice = [];
  if (priceFrom.value < minPrice) {
    alert('Price value less min value = ' + minPrice)
  }
  else if(priceTo > maxPrice){
    alert('Price value more max value =' + maxPrice)
  }
  else if(priceTo < priceFrom){
    alert('Incorrect data')
  }
  else{
    itemsSortByPrice.filter((e) => {    
      if(priceFrom.value <= e.price && e.price <= priceTo.value) {
        filteredPrice.push(e);
        updateChildren(products, filteredPrice);
        console.log(priceFrom.value,e.price,priceTo.value);
      }
    })
  }
}

const filRes = document.getElementById('filter-off');

filRes.addEventListener('click', (event) => {
  accord.querySelectorAll('input').forEach((input) => {
    input.checked = false;
    input.value = null;
  });
  updateChildren(products, items);
});
  //   updateChildren(products, items);
  // console.log(priceArr);

