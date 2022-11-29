export function calcCartPrice() {
  let totalAmount = 0;
  let totalPrice = 0;

  const cartItems = document.querySelectorAll('.cart__item');
  const totalPriceEl = document.querySelector('.cart__price');
  const totalAmountEl = document.querySelector('.cart__amount');

  if (totalPriceEl && totalAmountEl) {

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
}

export function checkCounter() {
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

export function addToCart(parentBox) {
  let cartData = getCartData() || {},
    itemId = parentBox.getAttribute('id'),
    itemTitle = parentBox.querySelector('.product__name').innerHTML,
    itemPrice = parentBox.querySelector('.price').innerHTML,
    itemImg = parentBox.querySelector('.product__img').src;
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][3] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, '/' + itemImg.split('/').slice(-3).join('/'), 1];
  }

  if (!setCartData(cartData)) {
    return false;
  }
}

export function addToCartPopup() {
  let cartData = getCartData() || {},
    parentBox = this.parentNode.parentNode,
    itemId = popupInner.getAttribute('id'),
    itemTitle = parentBox.querySelector('.col__title').innerHTML,
    itemPrice = document.getElementById('col-price').innerHTML,
    itemImg = parentBox.querySelector('.popup-img').src;
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][3] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, '/' + itemImg.split('/').slice(-3).join('/'), 1];
  }

  if (!setCartData(cartData)) {
    // this.disabled = false;
  }
}

export function openCart() {
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

export function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}

export function setCartData(o) {
  localStorage.setItem('cart', JSON.stringify(o));
  // return false;
}

export function active() {
  cartCont.classList.add('active');
  tagBody.classList.add('hidden');
}