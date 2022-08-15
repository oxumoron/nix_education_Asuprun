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
class Condidate = 
const condidate = new Condidate(condidateArr[0])
condidate.state /// Colorado
