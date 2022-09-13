import { workDay } from './myObj.js';

let day = [...workDay],
    arr = [];

const timeList = document.getElementById('day'),
      tasks = timeList.querySelectorAll('.tasks__box'),
      popup = document.getElementById('form__wrapper'),
      color = document.getElementById('event-color'),
      title = document.getElementById('event-title'),
      start = document.getElementById('time-start'),
      end = document.getElementById('time-end'),
      crt = document.querySelector('.form__btn input'),
      createBtn = document.getElementById('event-create');

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

function getEventData() {
  return JSON.parse(localStorage.getItem('event'));
}
// Записываем данные в LocalStorage
function setEventData(o) {
  localStorage.setItem('event', JSON.stringify(o));
  return false;
}

createBtn.addEventListener('click', (event) => {
  let newEvent = getEventData() || [],
      newArrEvent = [];
  newArrEvent.push(start.value,end.value,title.value,color.value);
  newEvent.push(newArrEvent);
  arr.push(newEvent);
  setEventData(arr);
  console.log(getEventData());
})