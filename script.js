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

//        2
function updateArr(data){
  let arr = []

  return function (data){
    data ? arr.push(data) : arr = []

    return console.log(arr);
  }
}

const getUpdatedArr = updateArr()

getUpdatedArr(3) // [3]
getUpdatedArr(5) // [3, 5]
getUpdatedArr({name: 'Vasya'}); 
getUpdatedArr() // []
getUpdatedArr(4)
