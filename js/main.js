import { workDay } from './myObj.js';

let day = [...workDay];

const timeList = document.getElementById('day'),
      tasks = timeList.querySelectorAll('.tasks__box'),
      popup = document.getElementById('form__wrapper'),
      start = document.getElementById('time-start');

let min = [...tasks].map((task) => {
  return { id: task.id, from: task.id.split('-')[0], to: task.id.split('-')[1] };
});

day.forEach((item) => {
  let findMin = min.findIndex((i) => {
    return i.from <= item.start && i.to > item.start;
  });

  let task = document.getElementById(`${min[findMin].id}`),
      newTask = document.createElement('div');

  newTask.classList.add('task');
  newTask.innerText = item.title;
  newTask.style.height = `${item.duration}px`;
  newTask.style.top = `${item.start - min[findMin].from}px`;
  task.appendChild(newTask);
});

function getTimeFromMins(dayStart, mins) {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return (hours+dayStart) + ':' + minutes;
};

timeList.addEventListener('click', (event) => {
  // console.log(event.currentTarget, getTimeFromMins(event.clientY));
  popup.classList.add('show');
  
  start.value = getTimeFromMins(8, event.clientY);
  
  popupHidden()
})

function popupHidden() {
  popup.addEventListener('click', (event) => {
    if(event.target.className == popup.className) {
      popup.classList.remove('show');
    }
  });

  document.addEventListener('keydown', function (e) {
    if(e.keyCode === 27) {
      popup.classList.remove('show');
    }
  });
}