let isAuth = false;
let init = false;
let token = '';
let filItems = {};
let tokens = [];
let allCards = [];
let items = [];

const products = document.getElementById('products');

const getProductAll = () => {
  fetch('http://nix-module.herokuapp.com/', {
    method: "GET",
    headers: {
      "x-access-token": token,
    }
  }).then(function (response) {
    response.json().then(function (products) {
      products.forEach(function (product) {
        items.push(product)
      });
      console.log(items);
      createCards(items);
    });
  }).catch(err => console.error(err));
}
// const getProductAll = () => {
//   fetch('http://localhost:3000/products/', {
//     method: "GET",
//     // headers: {
//     //   "x-access-token": token,
//     // }
//   }).then(function (response) {
//     response.json().then(function (products) {
//       products.forEach(function (product) {
//         items.push(product)
//       });
//       createCards(items);
//     });
//   }).catch(err => console.error(err));
// }

const searchProducts = () => {
  const searchInput = document.getElementById('search__input');
  const searchBtn = document.querySelector('.search__icon');
  const search = document.getElementById('search__form');
  search.addEventListener('submit', (e) => {
    e.preventDefault();
    loadProducts(searchInput.value);
  });
  searchBtn.addEventListener('click', () => {
    loadProducts(searchInput.value);
  })
};


const loadProducts = async (search = '') => {
  let items = [];
  fetch(`https://nix-module.herokuapp.com/${search}`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    }
  }).then(function (response) {
    response.json().then(function (goods) {
      goods.forEach(function (product) {
        items.push(product)
      });
      updateChildren(products, items);
    });
  }).catch(err => console.error(err));
};

const productWrapper = document.querySelector('li.product__wrapper');
const registrationPopup = document.querySelector('.registration__modal');
const loginPopup = document.querySelector('.login__modal');
const colList = document.getElementById('color-cat__list');
const memList = document.getElementById('memory-cat__list');
const osList = document.getElementById('os-cat__list');
const disList = document.getElementById('display__cat-list');
const priceList = document.getElementById('price__cat-list');
const popup = document.getElementById('product__modal');
const productWrappers = document.querySelectorAll('li.product__wrapper');
const tagBody = document.querySelector('body');
const allBtn = document.querySelectorAll('.product__btn');
const popupInner = document.querySelector('.modal__inner');
const accordBtn = document.querySelector('.accord__icon');
const accord = document.querySelector('.accord');
const filRes = document.getElementById('filter-off');
const priceFrom = document.getElementById('price-from');
const priceTo = document.getElementById('price-to');
const accordInner = document.querySelector('.accord__inner');
const allInputInAccord = accordInner.querySelectorAll("input");
const cartCounter = document.getElementById('counter');
const cartId = document.getElementById('cart');

let newName, newImage, newOrders, newPrice, newReviews, newStock, stockImg;

const createCards = function (card) {
  allCards = [];
  card.forEach((el) => {
    let newCard = document.createElement("li");
    let id = el._id;
    newCard.classList = "product__wrapper";
    newCard.id = `${id}`;
    newImage = `./img/${el.imgUrl}`;
    newName = el.name;
    newStock = el.orderInfo.inStock;
    if (newStock > 0) {
      stockImg = `./img/stock.svg`
    } else {
      stockImg = `./img/nostock.svg`;
    }
    newPrice = el.price;
    newOrders = Math.floor(300 + 700 * Math.random());
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
                    <button id="${newCard.id}" class="btn product__btn" ${newStock ? '' : 'disabled'}>Add to cart</button>
                  </div>
                  <div class="product__footer">
                    <div class="product__reviews"><span id="product__reviews">${newReviews}</span>% Positive reviews Above aletage
                    </div>
                    <div class="product__orders"><span id="product__orders">${newOrders}</span> orders</div>
                  </div>
                </div>
    `;

    allCards.push(newCard);
    newCard.addEventListener('click', (event) => {
      const {
        target
      } = event;
      if (target.className === 'btn product__btn') {
        addToCart(newCard);
        checkCounter();
        return false;
      }
      if (target.closest('.product__wrapper')) {
        popupFunc(allCards, newCard.id)
      }
    });
    allCards.map(card => products.appendChild(card));
  });
  if (items.length != 0) {
    if (init === false) {
      // colMemOsFil();
      // color();
      // memory();
      // osystem();
      checkCounter();

      init = true;
    }
  }
}

// createCards(items);


function color() {
  const inputCol = colList.querySelectorAll("input");
  for (let input of inputCol) {
    input.addEventListener('click', () => {
      let filteredColor = [];
      if (input.checked) {
        items.filter((e) => {
          if (e.color.indexOf(input.id) > -1) {
            filteredColor.push(e)
          }
        })
        updateChildren(products, filteredColor);
      } else {
        updateChildren(products, items);
      }
    })
  }
}

function memory() {
  const inputMem = memList.querySelectorAll("input");
  for (let input of inputMem) {
    input.addEventListener('click', () => {
      // filItems = {};
      let filteredMem = [];
      if (input.checked) {
        items.filter((e) => {
          if (e.storage === +input.id) {
            filteredMem.push(e)
          }
        })
        updateChildren(products, filteredMem);
        // filItems = {
        //   ...filteredMem
        // };
      } else {
        updateChildren(products, items);
      }
      // console.log(memory());

    })
  }
  return filItems;
}

// let fil = [];

function osystem() {
  const inputOs = osList.querySelectorAll("input");
  for (let input of inputOs) {
    input.addEventListener('click', () => {
      let filteredOs = [];
      if (input.checked) {
        // fil.push(input);
        items.filter((e) => {
          if (e.os === input.id) {
            filteredOs.push(e)
          }
        })
        updateChildren(products, filteredOs);
      } else {
        updateChildren(products, items);
      }
      // console.log(new Set(fil));
    })
  }

}

const colMemOsFil = () => {
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
    if (elem != null) {
      memList.appendChild(newMem);
    }
  });

  osAll.map(elem => {
    let newOs = document.createElement("li");
    newOs.classList.add('cat__item');
    newOs.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `
    if (elem != null) {
      osList.appendChild(newOs);
    }
  });
}

const arrBtnToAddCart = document.querySelectorAll('.btn');

const cartCont = document.getElementById('cart-modal');

function addToCart(parentBox) {
  let cartData = getCartData() || {},
    itemId = parentBox.getAttribute('id'),
    itemTitle = parentBox.querySelector('.product__name').innerHTML,
    itemPrice = parentBox.querySelector('.price').innerHTML,
    itemImg = parentBox.querySelector('.product__img').src;
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][3] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, '/' + itemImg.split('/').slice(-4).join('/'), 1];
  }

  if (!setCartData(cartData)) {
    return false;
  }
}

for (let i = 0; i < allBtn.length; i++) {
  allBtn[i].addEventListener('click', event => {
    event.stopPropagation();
  });
  allBtn[i].addEventListener('click', addToCart);
}

const btnInPopup = document.querySelector('.popup__btn')
btnInPopup.addEventListener('click', addToCartPopup);
btnInPopup.addEventListener('click', checkCounter());

function addToCartPopup() {
  let cartData = getCartData() || {},
    parentBox = this.parentNode.parentNode,
    itemId = popupInner.getAttribute('id'),
    itemTitle = parentBox.querySelector('.col__title').innerHTML,
    itemPrice = document.getElementById('col-price').innerHTML,
    itemImg = parentBox.querySelector('.popup-img').src;
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

    let allIdInCart = Object.entries(cartData);
    totalItems = `
            <div class="cart__inner">
              <div class="cart__header">
                <h4 class="cart__title">Shopping Cart</h4>
                <p>Checkout is almost done!</p>
              </div>
              <ul class="cart__items">
              `;
    allIdInCart.forEach(ar => {
      totalItems += `
          <li id="${ar[0]}" class="cart__item">
            <img id="item__img" class="item__img" src="${ar[1][2]}" height="100" width="100" alt="">
            <div class="item__desc">
              <h5 id="item__title" class="item__title">${ar[1][0]}</h5>
              <span id="item__price" class="item__price">${ar[1][1]}</span>
            </div>
            <div class="item__buttons">
              <button class="btn__less">
                <</button> <span class="item__count">${ar[1][3]}</span>
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
          <p>Total price: <span id="cart__price" class="cart__price"></span> $</p>
        </div>
        <div class="cart__buy">
          <button class="btn buy__btn">Buy</button>
        </div>`;

    cartCont.innerHTML = totalItems;

  } else {
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

// /////new cart
let arrayCartItem = [];
let arrayY = [];

function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o) {
  localStorage.setItem('cart', JSON.stringify(o));
  // return false;
}

function getTokenData() {
  return JSON.parse(localStorage.getItem('token'));
}

function setTokenData(o) {
  tokens.push(o);
  localStorage.setItem('token', JSON.stringify(tokens));
  // return false;
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

function popupFunc(array, idCard) {
  array.forEach((item) => {
    // console.log(item);
    // item.addEventListener('click', () => {
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

    items.find((el) => {
      if (el._id === idCard) {
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
}

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



const inputDisplay = disList.querySelectorAll("input");

for (let input of inputDisplay) {
  input.addEventListener('click', (event) => {
    filterDis(input);
  })
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

const inputPrice = priceList.querySelectorAll("input");

for (let input of inputPrice) {
  input.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
      filterPrice(input);
    }
  })
}
// filteredPrice
function filterPrice() {
  let itemsSortByPrice = [];
  itemsSortByPrice = [...sortArrByPrice()];
  const allPrice = items.map(el => el.price);
  const minPrice = Math.min.apply(null, allPrice);
  const maxPrice = Math.max.apply(null, allPrice);
  priceFrom.placeholder = minPrice;
  priceTo.placeholder = maxPrice;
  let filteredPrice = [];
  if (priceFrom.value < minPrice) {
    alert('Price value less min value = ' + minPrice)
  } else if (priceTo > maxPrice) {
    alert('Price value more max value =' + maxPrice)
  } else if (priceTo < priceFrom) {
    alert('Incorrect data')
  } else {
    itemsSortByPrice.filter((e) => {
      if (priceFrom.value <= e.price && e.price <= priceTo.value) {
        // console.log(priceFrom.value, e, priceTo.value);
        filteredPrice.push(e);

        updateChildren(products, filteredPrice);
      }
    })
  }
  return filteredPrice;
}

function sortArrByPrice() {
  return items.sort((prev, next) => {
    let prevB = prev.price;
    let nextB = next.price;
    return prevB - nextB;
  })
}

filRes.addEventListener('click', (event) => {
  accord.querySelectorAll('input').forEach((input) => {
    input.checked = false;
    input.value = null;
  });
  updateChildren(products, items);
});

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
    popupRegister();
  }
  if (target.className === "btn__log btn__sign") {
    popupRegister();
    loginPopup.classList.remove('modal__active');
    tagBody.classList.remove('hidden');
  }
  if (target.className === "login") {
    popupLogin();
  }
  if (target.className === "btn__reg btn__login") {
    popupLogin();
    registrationPopup.classList.remove('modal__active');
    tagBody.classList.remove('hidden');
  }
})

const regBtn = document.querySelector('.btn__reg.btn__sign');
regBtn.addEventListener('click', async () => {
  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  // console.log(user);
  let result = await fetch("https://nix-module.herokuapp.com/api/auth/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resultErr = await result.json()
  if (resultErr.message) {
    alert('Incorrect email or passowrd. Password minimum 3, maximum 8. Email must be true')
    return false;
  }
  const resultUser = await result.json({
    user
  });
  if (resultUser.user) {
    alert('User created')
    registrationPopup.classList.remove('modal__active');
    tagBody.classList.remove('hidden');
  }
})

const logBtn = document.querySelector('.btn__log.btn__login')
logBtn.addEventListener('click', async () => {
  const user = {
    username: document.getElementById("username-log").value,
    // email: document.getElementById("email").value,
    password: document.getElementById("password-log").value
  };
  let result = await fetch("https://nix-module.herokuapp.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  result = await result.json();
  if (result.message === 'User with this name not found') {
    alert('User with this name not found');
    return false;
  }
  token = result.token;
  getProductAll();
  searchProducts();
  isAuth = true;
  if (isAuth === true) {
    cartId.classList.remove('display-none')
    cartId.addEventListener('click', (openCart));
    cartId.addEventListener('click', (active));
    accordBtn.addEventListener('click', (event) => {
      accord.classList.toggle('accord--active');
      event.currentTarget.classList.toggle('active');
      colMemOsFil();
      color();
      memory();
      osystem();
    });
  }
  if (result.token) {
    // setTokenData(token);
    document.cookie = `myToken=${token}; max-age=3600`;
    console.log(document.cookie);
    loginPopup.classList.remove('modal__active');
    tagBody.classList.remove('hidden');
  }
})

function calcCartPrice() {
  let totalAmount = 0;
  let totalPrice = 0;

  const cartItems = document.querySelectorAll('.cart__item');
  const totalPriceEl = document.querySelector('.cart__price');
  const totalAmountEl = document.querySelector('.cart__amount');

  cartItems.forEach(function (item) {
    const amountElement = item.querySelector('.item__count');
    const priceElement = item.querySelector('.item__price');


    const currentPrice = parseInt(amountElement.innerText) * parseInt(priceElement.innerText);
    totalPrice += currentPrice;
    totalAmount += parseInt(amountElement.innerText);
  })

  totalPriceEl.innerText = totalPrice;
  totalAmountEl.innerText = totalAmount;
}

document.addEventListener('click', function (event) {
  // const cartInner = document.querySelector('.cart__item');
  // const btnMore = cartInner.querySelector('.btn__more');
  // const btnLess = cartInner.querySelector('.btn__less');
  let counter;
  let count;
  if (event.target.className === 'btn__more' || event.target.className === 'btn__less') {
    const counterWrapper = event.target.closest('.item__buttons');
    counter = counterWrapper.querySelector('.item__count');
  }

  if (event.target.className === 'btn__more') {
    // btnLess.removeAttribute('disabled', '');
    const el = event.target.closest('.cart__item').id;
    let newData = Object.assign(getCartData());
    Object.entries(newData).forEach((n) => {
      if (n[0] === el) {
        count = n[1][3];
        count++;
        n[1][3] = count;
        setCartData(newData);
      }
    });
    counter.innerText = ++counter.innerText;
  } else if (event.target.className === '.cart__items' && parseInt(counter.innerText) === 3) {
    // event.target.closest('.cart__item').remove();
    // btnMore.setAttribute('disabled', '')
    return false;
  }

  if (event.target.className === 'btn__less') {
    const el = event.target.closest('.cart__item').id;
    let newData = Object.assign(getCartData());
    if (parseInt(counter.innerText) > 1) {
      Object.entries(newData).forEach((n) => {
        if (n[0] === el) {
          count = n[1][3];
          count--;
          n[1][3] = count;
          setCartData(newData);
        }
      });
      counter.innerText = --counter.innerText;
    } else if (event.target.closest('.cart__items') && parseInt(counter.innerText) === 1) {
      // event.target.closest('.cart__item').remove();
      // btnLess.setAttribute('disabled', '')
      // calcCartPrice();
      return false;
    }
  }

  if (event.target.className === 'btn__del') {
    const el = event.target.closest('.cart__item').id;
    let getData = Object.assign({}, getCartData());
    delete getData[el];
    setCartData(getData);

    event.target.closest('.cart__item').remove();
    calcCartPrice();
  }
  checkCounter();
  calcCartPrice();
})

function checkCounter() {
  if (getCartData()) {
    let counter = 0;
    let data = getCartData();
    for (const key in data) {
      const el = data[key];
      counter += +el[3];
    }
    cartCounter.classList.remove('display-none');
    cartCounter.innerText = counter;
  } else {
    cartCounter.classList.add('display-none');
  }
}