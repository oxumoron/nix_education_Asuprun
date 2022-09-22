import {
  workDay
} from './myObj.js';

let day = [...workDay];

const timeList = document.getElementById('day'),
  tasks = timeList.querySelectorAll('.tasks__box'),
  popup = document.getElementById('form__wrapper'),
  color = document.getElementById('event-color'),
  title = document.getElementById('event-title'),
  start = document.getElementById('time-start'),
  end = document.getElementById('time-end'),
  clear = document.getElementById('clear'),
  defBgColor = '#e2ecf5',
  crt = document.querySelector('.form__btn button'),
  events = document.querySelectorAll('.task'),
  createBtn = document.getElementById('event-create'),
  changeBtn = document.getElementById('event-change'),
  deleteBtn = document.getElementById('event-delete');

let min = [...tasks].map((task) => {
  return {
    id: task.id,
    from: task.id.split('-')[0],
    to: task.id.split('-')[1]
  };
});


// if(!getEventData()){
//   console.log(newData);
//   createAllEvents(newData);
//   // day.forEach((item) => {
//   //   let findMin = min.findIndex((i) => {
//   //     return i.from <= item.start && i.to > item.start;
//   //   });

//   //   let task = document.getElementById(`${min[findMin].id}`),
//   //       newTask = document.createElement('div');

//   //   newTask.id = 'task-' + item.title;
//   //   newTask.classList.add('task');
//   //   newTask.innerText = item.title;
//   //   newTask.style.height = `${item.duration}px`;
//   //   newTask.style.top = `${item.start - min[findMin].from}px`;
//   //   task.appendChild(newTask);
//   // });
// }

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return (hours + 8) + ':' + minutes; // 8 morning
};

function getMinutesFromTime(time) {
  let hourS = +time.split(':')[0] - 8; // 8 morning
  let minS = +time.split(':')[1];
  return hourS * 60 + minS;
}

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) =>
    '#' + r + r + g + g + b + b)
  .substring(1).match(/.{2}/g)
  .map(x => parseInt(x, 16));


timeList.addEventListener('click', (event) => {
  popup.classList.add('show');
  deleteBtn.classList.remove('show');
  title.value = null;
  color.value = defBgColor;
  start.value = getTimeFromMins(event.clientY);
  end.value = null;
  popupHidden()
})

function popupHidden() {
  popup.addEventListener('click', (event) => {
    if (event.target.className == popup.className) {
      popup.classList.remove('show');
      changeBtn.classList.remove('show');
      createBtn.classList.remove('hidden');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      popup.classList.remove('show');
    }
  });
}

function getEventData() {
  return JSON.parse(localStorage.getItem('event'));
}

function convertDay(array) {
  let arr = [];
  array.forEach(ar => {
    let newArr = [];
    newArr.push(getTimeFromMins(ar.start));
    newArr.push(getTimeFromMins(ar.start + ar.duration));
    newArr.push(ar.title.replace(/ /g, '-'));
    newArr.push(defBgColor);
    newArr.push(`task-` + ar.title.replace(/ /g, '-'));
    arr.push(newArr);
  })
  return arr;
}

const newData = convertDay(day);
if (!getEventData()) {
  setEventData(newData);
}


function setEventData(o) {
  localStorage.setItem('event', JSON.stringify(o));
  return false;
}

createBtn.addEventListener('click', (event) => {
  let newEvent = getEventData();
  let newArrEvent = [];
  newArrEvent.push(start.value, end.value, title.value, color.value, `task-` + title.value.replace(/ /g, '-'));
  if (newEvent.length != 0) {
    newEvent.forEach(event => {
      const isEqual = event.toString() === newArrEvent.toString();
      if (!isEqual) {
        newArrEvent;
      } else {
        newArrEvent = null;
      }
    })
    newEvent.push(newArrEvent);
  } else {
    newEvent.push(newArrEvent);
  }
  setEventData(newEvent);
})

function createAllEvents(array) {
  if (array) {
    array.forEach((item) => {
      let start = getMinutesFromTime(item[0]);
      let end = getMinutesFromTime(item[1]);
      let duration = end - start;
      let a = .5,
        b = 0;
      let rgba = hexToRgb(item[3]);
      let findMin = min.findIndex((i) => {
        return i.from <= start && i.to > start;
      });

      let task = document.getElementById(`${min[findMin].id}`),
        newTask = document.createElement('div');
      newTask.classList.add('task');
      newTask.id = 'task-' + item[2];
      newTask.innerText = item[2];
      newTask.style.height = `${duration}px`;
      newTask.style.backgroundColor = "rgba(" + rgba.concat(a).join(',') + ")";
      newTask.style.borderColor = "rgba(" + rgba.concat(b).join(',') + ")";
      newTask.style.top = `${start - min[findMin].from}px`;
      task.appendChild(newTask);
    });
  }
}
createAllEvents(getEventData());

function validTime(inputStr) {
  if (!inputStr || inputStr.length < 1) {
    return false;
  }
  let time = inputStr.split(':');
  return time.length === 2 &&
    parseInt(time[0], 10) >= 8 &&
    parseInt(time[0], 10) <= 16 &&
    parseInt(time[1], 10) >= 0 &&
    parseInt(time[1], 10) <= 59;
}

// end.addEventListener('input', (event) =>{
//   if (!validTime(end.value)){
//     end.style.backgroundColor = 'red';
//     crt.setAttribute('disabled',true);
//   } else{
//     console.log(true);
//   }
// })


timeList.addEventListener('click', (event) => {
  let newDataArr = [];
  const {
    target
  } = event;
  if (target.className === 'task') {
    // show
    getEventData().map(arr => {
      if (arr.indexOf(target.id) != -1) {
        popup.classList.add('show');
        deleteBtn.classList.add('show');
        createBtn.classList.add('hidden');
        changeBtn.classList.add('show');
        start.value = arr[0];
        end.value = arr[1];
        title.value = arr[2];
        color.value = arr[3];
        popupHidden();
      }
    })

    // change
    changeBtn.addEventListener('click', (event) => {
      let newArrEvent = [];
      let newDataArr = [];
      getEventData().map(arr => {
        if (arr.indexOf(target.id) != -1) {
          newArrEvent.push(start.value, end.value, title.value, color.value, `task-` + title.value.replace(/ /g, '-'));
          arr = [...newArrEvent];
          newDataArr.push(arr);
        } else {
          newDataArr.push(arr);
        }
      })
      setEventData(newDataArr);
    })
    //  delete
    deleteBtn.addEventListener('click', (event) => {
      getEventData().map(arr => {
        if (arr.indexOf(target.id) === -1) {
          newDataArr.push(arr)
        }
      })
      setEventData(newDataArr);


      createAllEvents(getEventData());
      title.value = null;
      color.value = defBgColor;
      start.value = null;
      end.value = null;
    })
  }
})


clear.addEventListener('click', (event) => {
  localStorage.removeItem('event');
  // let nullArr = null;
  // setEventData(nullArr);
  location.reload();
})