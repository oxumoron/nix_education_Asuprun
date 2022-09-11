import { workDay } from './myObj.js';

let day = [...workDay];

const timeList = document.getElementById('day'),
      tasks = timeList.querySelectorAll('.tasks__box');

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
