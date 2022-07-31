//      1
const citiesAndCountries = {
	'Киев': 'Украина',
	'Нью-Йорк': 'США',
	'Амстердам': 'Нидерланды',
	'Берлин': 'Германия',
	'Париж': 'Франция',
	'Лиссабон': 'Португалия',
	'Вена': 'Австрия',
};

const result = [];
for (var prop in citiesAndCountries) {
  result.push(prop + " - это " + citiesAndCountries[prop]);
}
console.log(result);

//      2

let result2 = [];

function hw2(length) {

  if (length % 3 === 0){
    for(let i = 0; i < length; i += 3 ) {
      result2.push([i + 1, i + 2, i + 3]);
    }
    return console.log(result2);
  } else {
    console.log('Число некратное 3');
  }

}

hw2(99);


//      3
const namesOfDays = {
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг' , 'Пятница' , 'Суббота' , 'Воскресенье'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'],
}

// console.log(namesOfDays['ru'][1]);
function getDay (lang, day) {
  return namesOfDays[lang][day - 1];
}
console.log(getDay('ru',2));
