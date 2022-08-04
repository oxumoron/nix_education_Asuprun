class Person{
  constructor(emplyeeArr){
    //      1
    Object.assign(this, emplyeeArr);
  }
//          2
  getFullName(){
    return `${this.name} ${this.surname}`;
  }

  getAllSalary(){
    return this.salary;
  }
};
//        3
const emplyeeConstructArr = emplyeeArr.map(employee => new Person(employee))      
console.log(emplyeeConstructArr);

//        4 
const getFullNamesFromArr = [];
emplyeeConstructArr.forEach(person => getFullNamesFromArr.push(person.getFullName()))
console.log(getFullNamesFromArr);

//        5
const AllSalaryArr = [];
emplyeeConstructArr.forEach(person => AllSalaryArr.push(person.getAllSalary()))
const getMiddleSalary = (AllSalaryArr) => {
  return AllSalaryArr.reduce((acc, number) => acc + number) / AllSalaryArr.length;
};
console.log(getMiddleSalary(AllSalaryArr));

// 6
const getRandomEmployee = (emplyeeConstructArr) => {
  return emplyeeConstructArr[Math.floor(Math.random() * emplyeeConstructArr.length)];
}
console.log(getRandomEmployee(emplyeeConstructArr));
