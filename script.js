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
getUpdatedArr({name: 'Vasya'});  // [3, 5, {name: 'Vasya'}]
getUpdatedArr() // []
getUpdatedArr(4)



//        2.2
function updateStr(data){
  let str = ''

  return function (data){
    data ? str += data : str = ''

    return console.log(str);
  }
}

const getUpdatedStr = updateStr()
getUpdatedStr('a') // [3]
getUpdatedStr('b') // [3, 5]
getUpdatedStr('bfafafaaf') // [3, 5]
getUpdatedStr('bfaafafafnnnnnn') // [3, 5]
getUpdatedStr() // [3, 5]
getUpdatedStr('b') // [3, 5]