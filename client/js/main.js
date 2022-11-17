// import {
//   items
// } from './items.js';
let token = '';

const items = [];

const getProductAll = () => {
  fetch('http://localhost:3000/products/', {
    method: "GET",
    headers: {
      "x-access-token": token,
    }
  }).then(function (response) {
    response.json().then(function (products) {
      products.forEach(function (product) {
        items.push(product)
      });
      createCards(items);
    });
  }).catch(err => console.error(err));
}

const searchProducts = () => {
  const searchInput = document.getElementById('search__input');
  const search = document.getElementById('search__form');
  search.addEventListener('submit', (e) => {
    e.preventDefault();
    loadProducts(searchInput.value);
  });
};

searchProducts()

const loadProducts = async (search = '') => {
  fetch(`http://localhost:3000/products/${search}`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    }
  }).then(function (response) {
    response.json().then(function (products) {
      products.forEach(function (product) {
        items.push(product)
      });
      createCards(items);
    });
  }).catch(err => console.error(err));
};

const products = document.getElementById('products');
const productWrapper = document.querySelector('li.product__wrapper');
const registrationPopup = document.querySelector('.registration__modal');
const loginPopup = document.querySelector('.login__modal');
// const newName = document.getElementById('product__name');
// const newImage = document.getElementById('product__photo');
// const newOrders = document.getElementById('product__orders');
// const newPrice = document.getElementById('product__price');
// const newReviews = document.getElementById('product__reviews');
// const newStock = document.getElementById('product__stock');
// const stockImg = document.getElementById('stock__img');
// const cardBtn = document.querySelector('.product__btn');
let newName, newImage, newOrders, newPrice, newReviews, newStock, stockImg;
const cardBtn = document.querySelector('.product__btn');
const popupInner = document.querySelector('.modal__inner');


// const like = document.getElementById('like');

// console.log(items);

const createCards = function (card) {
  // clean list cards
  card.forEach((el) => {
    let newCard = document.createElement("li");
    let id = el.id;
    newCard.classList = "product__wrapper";
    newCard.id = `${id}`;
    newImage = `./img/${el.imgUrl}`;
    newName = el.name;
    newStock = el.orderInfo.inStock;
    if (newStock > 0) {
      // cardBtn.disabled = false;
      stockImg = `./img/stock.svg`
    } else {
      // cardBtn.disabled = true;
      stockImg = `./img/nostock.svg`;
    }
    newPrice = el.price;
    newOrders = Math.floor(300 + 700 * Math.random());
    // cardBtn.id = `${id}`;
    newReviews = el.orderInfo.reviews;

    newCard.innerHTML = `
              <div class="product">
                  <div class="like">
                  <img src="img/icons/like_empty.svg" alt="">
                  </div>
                  <div class="product__photo">
                    <img class="product__img" id="product__photo" src="${newImage}" height="200" width="200" alt="">
                  </div>
                  <div class="product__desc">
                    <h3 id="product__name" class="product__name">${newName}</h3>
                    <p class="product__stock"><img id="stock__img" src="${stockImg}" alt=""><span id="product__stock">${newStock}</span> left in stock</p>
                    <p class="product__price">Price: <span class="price" id="product__price">${newPrice}</span> $</p>
                    <button id="${newCard.id}" class="btn product__btn">Add to cart</button>
                  </div>
                  <div class="product__footer">
                    <div class="product__reviews"><span id="product__reviews">${newReviews}</span>% Positive reviews Above aletage
                    </div>
                    <div class="product__orders"><span id="product__orders">${newOrders}</span> orders</div>
                  </div>
                </div>
    `;
    // if(newStock === 0){
    //   cardBtn.disabled = true;
    // }
    // console.log(newStock === 0);
    // 
    // add events click on card
    products.appendChild(newCard);

  });
}

createCards(items);


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

const popup = document.getElementById('product__modal');
const productWrappers = document.querySelectorAll('li.product__wrapper');
const tagBody = document.querySelector('body')

// like
productWrappers.forEach((item) => {
  item.addEventListener('click', (event) => {
    const {
      target
    } = event;
    if (target.parentElement.className === "product__btn") {
      const like = document.querySelectorAll('.like');
      like.forEach(el => {
        el.addEventListener('click', (event) => {
          event.stopPropagation();
          el.classList.toggle('filled');
        })
      })
    }
  })
})

// const cartPopup = document.getElementById('cart-modal');
const arrBtnToAddCart = document.querySelectorAll('.btn');
////////////new cart
const cartCont = document.getElementById('cart-modal');

function addToCart() {
  // this.disabled = true;
  let cartData = getCartData() || {},
    parentBox = this.parentNode.parentNode.parentNode,
    itemId = this.getAttribute('id'),
    itemTitle = parentBox.querySelector('.product__name').innerHTML,
    itemPrice = parentBox.querySelector('.price').innerHTML,
    itemImg = parentBox.querySelector('.product__img').src;
  // console.log('/' + itemImg.split('/').slice(-3).join('/'));
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][3] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, '/' + itemImg.split('/').slice(-4).join('/'), 1];
  }

  if (!setCartData(cartData)) {
    return false;
  }
}

const allBtn = document.querySelectorAll('.product__btn')
for (let i = 0; i < allBtn.length; i++) {
  allBtn[i].addEventListener('click', event => {
    event.stopPropagation();
  });
  allBtn[i].addEventListener('click', addToCart);
}

const btnInPopup = document.querySelector('.popup__btn')
btnInPopup.addEventListener('click', addToCartPopup);

function addToCartPopup() {
  let cartData = getCartData() || {},
    parentBox = this.parentNode.parentNode,
    itemId = popupInner.getAttribute('id'),
    itemTitle = parentBox.querySelector('.col__title').innerHTML,
    itemPrice = document.getElementById('col-price').innerHTML,
    itemImg = parentBox.querySelector('.popup-img').src;
  console.log(itemImg);
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][3] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, '/' + itemImg.split('/').slice(-4).join('/'), 1];
  }

  if (!setCartData(cartData)) {
    // this.disabled = false;
  }
}

function openCart() {
  let cartData = getCartData(),
    totalItems = '';
  if (cartData !== null) {

    let newCartArray = Object.values(cartData);
    totalItems = `
            <div class="cart__inner">
              <div class="cart__header">
                <h4 class="cart__title">Shopping Cart</h4>
                <p>Checkout is almost done!</p>
              </div>
              <ul class="cart__items">
              `;
    newCartArray.forEach(ar => {
      totalItems += `
                  <li class="cart__item">
                    <img id="item__img" class="item__img" src="${ar[2]}" height="100" width="100" alt="">
                    <div class="item__desc">
                      <h5 id="item__title" class="item__title">${ar[0]}</h5>
                      <span id="item__price" class="item__price">${ar[1]}</span>
                    </div>
                    <div class="item__buttons">
                      <button class="btn__less">
                        <</button> <span class="item__count">${ar[3]}</span>
                          <button class="btn__more">></button>
                          <button class="btn__del">X</button>
                    </div>
                  </li>
                  
                      `;

    })
    totalItems += `
    </ul>
        <div class="cart__total">
          <p>Total amount: <span id="cart__amount" class="cart__amount"></span> ptc.</p>
          <p>Total price: <span id="cart__price" class="cart__price"></span>$</p>
        </div>
        <div class="cart__buy">
          <button class="btn buy__btn">Buy</button>
        </div>`;

    cartCont.innerHTML = totalItems;

  } else {
    // если в корзине пусто, то сигнализируем об этом
    cartCont.innerHTML = `
    <div class="cart__inner">
      <div class="cart__header">
        <h4 class="cart__title">Shopping Cart</h4>
        <p>Checkout is almost done!</p>
      </div>
      <ul class="cart__items">
      <p style="font-size: 32px">В корзине пусто</p>
    `;
  }

}

document.getElementById('cart').addEventListener('click', (openCart));
document.getElementById('cart').addEventListener('click', (active));



// /////new cart
let arrayCartItem = [];
let arrayY = [];

function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o) {
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}

function active() {
  cartCont.classList.add('active');
  tagBody.classList.add('hidden');
}

cartCont.onmousedown = function (e) {
  let target = e.target;
  let modalContent = cartCont.getElementsByClassName('cart__inner')[0];
  if (e.target.closest('.' + modalContent.className) === null) {
    this.classList.remove('active');
    tagBody.classList.remove('hidden');
  }
};

// document.querySelector('body').addEventListener('click', event => {
//   const {target} = event;
//     if (hasClassedParent(target, 'product__wrapper')) {
//       popupFunc(items);
//     }
//   })


// function hasClassedParent(el, cssClass) {
//   if(el.parentNode && el.parentNode.tagName !== 'BODY') {
//     if(el.parentNode.classList.contains(cssClass)) {
//       return el.parentNode;
//     } else {
//       return hasClassedParent(el.parentNode, cssClass);
//     }
//   } else {
//     return null;
//   }
// }

function popupFunc(array) {
  productWrappers.forEach((item) => {
    item.addEventListener('click', () => {
      popupInner.id = item.id;
      popup.classList.add('modal__active');
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

      array.find((el) => {
        if (+el.id === +item.id) {
          // console.log(item);
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
}
popupFunc(items);


const removeChildren = function (item) {
  while (item.firstChild) {
    item.removeChild(item.firstChild)
  }
}

const updateChildren = function (item, children) {
  let childrenArr = [];
  removeChildren(item);
  for (let i = 0; i < children.length; i++) {
    childrenArr.push(children[i]);
  }
  createCards(childrenArr);
}

const inputCol = colList.querySelectorAll("input");
const inputMem = memList.querySelectorAll("input");
const inputOs = osList.querySelectorAll("input");
const inputDisplay = disList.querySelectorAll("input");
const inputPrice = priceList.querySelectorAll("input");

const accordInner = document.querySelector('.accord__inner');
const allInputInAccord = accordInner.querySelectorAll("input");

// for (let input of allInputInAccord) {
//   input.addEventListener('input', (event) => {
//       let cardsArr = [];
//         let filteredOs = [];
//         if (input.checked) {
//           items.filter((e) => {
//             if (e.os === input.id) {
//               filteredOs.push(e) && cardsArr.push(filteredOs);
//             }
//             // updateChildren(products, filteredOs);
//             // console.log(e);
//           })
//         } else {
//           // updateChildren(products, items);
//           // cardsArr.push(filterPrice(inp))
//         }
//         // cardsArr.push(filterPrice(input),filterCol(input),filterDis(input),filterMem(input),filterOs(input));
//         // updateChildren(products, cardsArr.push(filterPrice(input),filterCol(input),filterDis(input),filterMem(input),filterOs(input)));
//         // console.log(cardsArr);
//         // console.log(cardsArr);
//       })
//     }

for (let input of inputCol) {
  input.addEventListener('click', (event) => {
    filterCol(input);
  })
}

for (let input of inputPrice) {
  input.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
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
  return filteredColor;
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
  return filterMem;
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
  return filterOs;
}

function filterDis(el) {
  let filteredDis = [];
  if (el.checked) {
    items.filter((e) => {
      if (el.id === `inch2_5`) {
        if (e.display >= 2 && e.display < 5) {
          filteredDis.push(e)
        }
      }
      if (el.id === `inch_7`) {
        if (e.display >= 5 && e.display < 7) {
          filteredDis.push(e)
        }
      }
      if (el.id === `inch7_12`) {
        if (e.display >= 7 && e.display < 12) {
          filteredDis.push(e)
        }
      }
      if (el.id === `inch12_16`) {
        if (e.display >= 12 && e.display < 16) {
          filteredDis.push(e)
        }
      }
      if (el.id === `more16`) {
        if (e.display > 16) {
          filteredDis.push(e)
        }
      }
      updateChildren(products, filteredDis);
    })
  } else {
    updateChildren(products, items);
  }
  return filteredDis;
}

let itemsSortByPrice = [];

function sortArrByPrice() {
  return items.sort((prev, next) => {
    let prevB = prev.price;
    let nextB = next.price;
    return prevB - nextB;
  })
}
itemsSortByPrice = [...sortArrByPrice()];

function filterPrice() {
  let filteredPrice = [];
  if (priceFrom.value < minPrice) {
    // alert('Price value less min value = ' + minPrice)
  } else if (priceTo > maxPrice) {
    // alert('Price value more max value =' + maxPrice)
  } else if (priceTo < priceFrom) {
    // alert('Incorrect data')
  } else {
    itemsSortByPrice.filter((e) => {
      if (priceFrom.value <= e.price && e.price <= priceTo.value) {
        filteredPrice.push(e);
        updateChildren(products, filteredPrice);
      }
    })
  }
  return filteredPrice;
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

function popupRegister() {
  registrationPopup.classList.add('modal__active');
  tagBody.classList.add('hidden');
  registrationPopup.onmousedown = function (e) {
    let target = e.target;
    let modalContent = registrationPopup.getElementsByClassName('registration-modal__inner')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      this.classList.remove('modal__active');
      tagBody.classList.remove('hidden');
    }
  };
}

function popupLogin() {
  loginPopup.classList.add('modal__active');
  tagBody.classList.add('hidden');
  loginPopup.onmousedown = function (e) {
    let target = e.target;
    let modalContent = loginPopup.getElementsByClassName('login-modal__inner')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      this.classList.remove('modal__active');
      tagBody.classList.remove('hidden');
    }
  };
}

tagBody.addEventListener('click', (event) => {
  const {
    target
  } = event;
  if (target.className === "registration") {
    popupRegister()
  }
  if (target.className === "login") {
    popupLogin()
  }
})

const regBtn = document.querySelector('.btn__reg.btn__sign')
regBtn.addEventListener('click', async (event) => {
  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  // console.log(user);
  let result = await fetch("http://localhost:3000/api/auth/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // console.log('not true');
  result = await result.json({
    user
  });
  if (result.user) {
    alert('User created')
    registrationPopup.classList.remove('modal__active');
    tagBody.classList.remove('hidden');
  }
})

const logBtn = document.querySelector('.btn__log.btn__login')
logBtn.addEventListener('click', async (event) => {
  const user = {
    username: document.getElementById("username-log").value,
    // email: document.getElementById("email").value,
    password: document.getElementById("password-log").value
  };
  let result = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    // "token"

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  result = await result.json();
  token = result.token;
  getProductAll();
  if (result.token) {
    loginPopup.classList.remove('modal__active');
    tagBody.classList.remove('hidden');
  }
})


// const appF = async () => {
//   console.log(123);
//   fetch("http://localhost:3000/api/auth/items", {
//     method: "GET",
//     // "token"
//   });
//   result = await result.json();
//   token = result.token;

// }

// appF()