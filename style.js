import { condidateArr } from './candidates.js';
//        1
const arr = ['Vasya', 'Petya', 'Alexey']
console.log(arr) /// ['Vasya', 'Alexey']

function removeUser(array, index){
  array.splice(index,1);
  return console.log(array);
}
removeUser(arr, 1)

//      2
const obj = { name: 'Vasya', age: 1}
function getAllKeys(object){
  return console.log(Object.keys(object));
}
getAllKeys(obj) /// ["name", "age"]

//      3
const obj3 = { name: 'Vasya', age: 1}

const getAllValues = (object) =>{
  return console.log(Object.values(object
    ));
}

getAllValues(obj) /// ["Vasya", 1]

//      4
const obj1 = {
  id: 3,
  name: 'Vasya'
}

const secondObj = {
  id: 4,
  name: 'Katya'
}

const arr1 = [
  {
      id: 1,
      name: 'Kolya'
  },
  {
      id: 2,
      name: 'Petya'
  },
];

function insertIntoarr(object, id){
  if (id > 0) return arr1.splice(id - 1, 0, object)  
}

insertIntoarr(obj1,2)
console.log(arr1) 
/// [ {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

insertIntoarr(secondObj, 1)
console.log(arr1) 
/// [ {id: 4,name: 'Katya'}, {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

//      5
class Condidate{
  constructor(condidateArr){
    Object.assign(this,condidateArr)
  }
  get state(){
    return console.log(this.address.split(', ')[2]);
  }
  //      6
  getCompanyNames(){
    return this.company;
  }
  getAllCompaniesNames(){
    return console.log(getCompanyNamesArr);
  }
  //      7
  getUsersByYear(year) {
    return console.log(condidateConstructorArr
      .filter(({registered}) => {
        return year === new Date(registered).getFullYear();
      })
      .map(({_id}) => _id))
  }
  //       8
  getCondidatesByUnreadMsg(msgCount){
    return console.log(condidateConstructorArr.filter(({greeting}) => {
      return greeting.match(new RegExp(` ${msgCount} `))
    }))
  }
  //       9
  getCondidatesByGender(sex){
    return console.log(condidateConstructorArr.filter(({gender}) => {
      return gender === sex;
    }));
  }
}
  const getCompanyNamesArr = [];
  const condidateConstructorArr = condidateArr.map(cond => new Condidate(cond))   
  condidateConstructorArr.forEach(condidate => getCompanyNamesArr.push(condidate.getCompanyNames()))
  
  const condidate = new Condidate(condidateArr[0]);
  console.log(condidate);
  condidate.state; /// Colorado
  //      6
condidate.getAllCompaniesNames(); /// [""EZENT, "JASPER" ... ]

//        7
condidate.getUsersByYear(2016)

//        8
condidate.getCondidatesByUnreadMsg(8)

//        9
condidate.getCondidatesByGender('male')

//        10
Array.prototype.map1 = function (func){
  const result = [...this]
  for (let i = 0; i < result.length; i++) {
    result[i] = func(result[i]);
  }
  return console.log(result);
}

const arr10 = [1,2,3,4,5]
arr10.map1(item => item*10)

Array.prototype.reduce1 = function (callback, initialValue){
  if (this == null) {
    throw new Error('Cant iterate over undefined or null')
  }
  let result;
  let i = 0;
  let O = Object(this);
  let len = O.length;
  if (typeof callback !== 'function') {
    throw new Error('Callback is not a function')
  }
  if (arguments.length >= 2) {
    result = initialValue
  } else {
    if (len === 0) {
    throw new Error('Reduce of empty array with no initial value')
    }
    result = O[i];
    i++;
  }
  for (; i < this.length; i++) {
    if (i in O) {
      result = callback(result,O[i],i,O)
    }
  }
  return result;
}

function add(a, b) {
  return a + b;
}

console.log([0].reduce1(add));