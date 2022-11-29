export function color() {
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

export function memory() {
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

export function osystem() {
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

export const colMemOsFil = () => {
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

export function filterDis(el) {
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

export function filterPrice() {
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

export function sortArrByPrice() {
  return items.sort((prev, next) => {
    let prevB = prev.price;
    let nextB = next.price;
    return prevB - nextB;
  })
}