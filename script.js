// import { studentArr } from "./studentArr.js";

// Задача - создать класс Student который принимает аргументом в конструкторе объект enrollee (абитурент). У экземпляра класса Student должны быть поля:
// id - уникальный идентификатор студента (генерируется при создании экземпляра и начинается с 1);
// name - имя студента (передаем в объекте enrollee);
// surname - фамилия студента (передаем в объекте enrollee);
// ratingPoint - рейтинг студента по результатам вступительных экзаменов (передаем в объекте enrollee);
// schoolPoint - рейтинг студента по результатам ЗНО (передаем в объекте enrollee);
// isSelfPayment - если true, то студент на контракте, если false - на бюджете (генерируется по логике указанной ниже).
// Id генерируется автоматически при создании экземпляра Student. isSelfPayment определяется по параметру "ratingPoint". Если ratingPoint больше или равен 800, то студент может быть на бюджет, но бюджет он может получить только если его "ratingPoint" не меньше чем у других студентов в массиве. Студентов которые на бюджете не должно быть больше чем 5 в массиве. То есть если "ratingPoint" больше чем хоть у одного из 5 бюджетников то мы присваиваем isSelfPayment = false. И в этот момент студент из массива который имел isSelfPayment = false, но его ratingPoint меньше чем у остальных 5 бюджетников, с нашим включительно, то ему делаем isSelfPayment = true, то есть переводим этого неудачника на контракт. Что делать если у 6-рых студентов баллы 1000? Ну имеется ввиду, если 2 человека с одинаковыми баллами ratingPoint борются за 5 бюджетное место? В таком случае смотрим на schoolRating, у кого он больше тот и на бюджете.
//  При каждом новом вызове конструктора, все логика должна отрабатывать таким образом, что пересчет будет изменяться с новым студентом включительно.


// const studentsArr = [... массив со студентами].

class Student {
  static _id = 1
  static listOfStudents = [] 
  // id
  constructor(student) {
    this.addStudent({
      id: Student._id++,
      ...student,
      isSelfPayment: false
    })
  }
  addStudent(student){
    Student.listOfStudents.push(student)
    Student.listOfStudents = Student.listOfStudents
        .sort((prev, next) => {
          let result = next.ratingPoint - prev.ratingPoint

          if(result) return result
          else {
            return next.schoolPoint - prev.schoolPoint
          }
        })
        .map((student, idx) => {
          return {
            ...student,
            isSelfPayment: idx < 5 ? true : false
          }
        })
        .sort((prev, next) => {
          return prev.id - next.id;
        })
  }
}

studentArr.forEach(student => new Student(student));
console.log(Student.listOfStudents);

/// [{ id: 1,  name: 'Valeriy', ...}, { id: 2,  name: 'Maks', ...},  и т.д.]


class CustomString{
  reverse(str){
    let newStr = '';
    for (let i = str.length;i; i -= 1) newStr += str[i - 1];
    return console.log(newStr);
  }
  ucFirst(str){
    return console.log(str[0].toUpperCase() + str.slice(1));
  }
  ucWords(str) {
    return console.log(str
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
      )
  }
}

const myString = new CustomString();

myString.reverse('qwerty'); //выведет 'ytrewq'
myString.ucFirst('qwerty'); //выведет 'Qwerty'
myString.ucWords('qwerty qwerty qwerty'); //выведет 'Qwerty Qwerty Qwerty