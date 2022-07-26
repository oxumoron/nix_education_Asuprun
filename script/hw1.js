//      1
for (let i = 1; i < 10; i++) {
  if (i % 3 == 0) {
    console.log('FizBuz');
    continue;
  }
  if (i % 2 !== 0) {
    console.log('Buz');
    continue;
  }
  if (i % 2 == 0) {
    console.log('Fiz');
    continue;
  }
}


//      2
let num = 7;
for (let i = num - 1; i >= 1; i--) {
  num *= i;
}
console.log(num);

//      3
const sheetsInReamPaper = 500;
const consumptionPerWeek = 1200;
const weeksAmount = 8;

let reamPaperAmount = (weeksAmount * consumptionPerWeek) / sheetsInReamPaper;

let check = reamPaperAmount % 1;
let result = reamPaperAmount - check;

if (check > 0) {
  console.log(result + 1);
}
else{
  console.log(result);
}


