export function popupFunc(array, idCard) {
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
      // let target = e.target;
      let modalContent = popup.getElementsByClassName('modal__inner')[0];
      if (e.target.closest('.' + modalContent.className) === null) {
        this.classList.remove('modal__active');
        tagBody.classList.remove('hidden');
      }
    };
  })
}

export function popupRegister() {
  registrationPopup.classList.add('modal__active');
  tagBody.classList.add('hidden');
  registrationPopup.onmousedown = function (e) {
    // let target = e.target;
    let modalContent = registrationPopup.getElementsByClassName('registration-modal__inner')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      this.classList.remove('modal__active');
      tagBody.classList.remove('hidden');
    }
  };
}

export function popupLogin() {
  loginPopup.classList.add('modal__active');
  tagBody.classList.add('hidden');
  loginPopup.onmousedown = function (e) {
    // let target = e.target;
    let modalContent = loginPopup.getElementsByClassName('login-modal__inner')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      this.classList.remove('modal__active');
      tagBody.classList.remove('hidden');
    }
  };
}