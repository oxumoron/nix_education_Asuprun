// popupFunc

export const createCards = function (card) {
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
                  <img class="like__img" src="img/icons/like_empty.svg" alt="">
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
      if (target.parentElement.className === "like") {
        const like = document.querySelectorAll('.like__img');
        like.forEach(el => {
          el.addEventListener('click', (event) => {
            event.stopPropagation();

            if (!el.classList.contains('filled')) {
              el.classList.add('filled');
            } else {
              el.classList.remove('filled');
            }
          })
        })
      }

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

export const getProductAll = () => {
  items = [];
  fetch('https://nix-module.herokuapp.com/products/', {
    method: "GET",
    headers: {
      // 'Content-Type': 'application/json',
      "x-access-token": token,
    }
  }).then(function (response) {
    response.json().then(function (goods) {
      goods.forEach(function (product) {
        items.push(product)
      });
      // console.log(items);
      updateChildren(products, items);
    })
  }).catch(err => console.error(err));
}

export const searchProducts = () => {
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

export const loadProducts = async (search = '') => {
  let items = [];
  fetch(`https://nix-module.herokuapp.com/products/${search}`, {
    method: "GET",
    headers: {
      // 'Content-Type': 'application/json',
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

export const removeChildren = function (item) {
  while (item.firstChild) {
    item.removeChild(item.firstChild)
  }
}

export const updateChildren = function (item, children) {
  let childrenArr = [];
  removeChildren(item);
  for (let i = 0; i < children.length; i++) {
    childrenArr.push(children[i]);
  }
  createCards(childrenArr);
}