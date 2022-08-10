  //        1
function increase(num) {
  let count = 0;

  return function (num) {
    return console.log(count += num);
  }
}

let counter = increase();

counter(3);
counter(5);
counter(228);

