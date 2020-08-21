today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
const workoutsURL = 'http://localhost:3000/workouts';
const profileURL = 'http://localhost:3000/profile';
const moreParamsForm = document.querySelector('#strength-and-muscle-params-form');
const calenderDiv = document.querySelector('#calender');
const workoutCardDiv = document.querySelector('#display-workout');
const logoutBtn = document.querySelector('#logout-btn');

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    let date = 1;

    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            cell = document.createElement("td");
            cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else if (date > daysInMonth(month, year)){
              break;
          } else {
              cellText = document.createTextNode(date);
              cell = document.createElement("td");
              if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                cell.classList.add("border", "border-info");
                todayCell = cell;
              }
              cell.appendChild(cellText);
              row.appendChild(cell);
              date++;
            }
          }
        tbl.appendChild(row);
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

const generateWorkout = (extraParams) => {
  fetch(workoutsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(extraParams)
  }).then(response => response.json())
    .then(renderWorkoutToCalender)
}

logoutBtn.addEventListener('click', () => {
  window.location.replace('index.html');
  localStorage.removeItem('token');
})

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const renderWorkoutToCalender = (workout) => {
  console.log(workout);
  workoutUl = document.createElement('ul');
  workoutLi = document.createElement('li');
  if (workout.strength == true) {
    workoutType = 'Strength';
  } else if (workout.strength == false) {
    workoutType = 'Hypertrophy';
  }
  workoutLi.innerHTML = `${capitalize(workout.muscle_group)} - ${workoutType}`;
  addWorkoutLiEventListener(workoutLi, workout);
  workoutUl.append(workoutLi);
  workoutUl.style = "font-size: 13px;";
  workoutUl.classList.add('mb-0');
  todayCell.append(workoutUl);
}

const addWorkoutLiEventListener = (workoutLi, workout) => {
  workoutLi.addEventListener('click', () => {
    const workoutCard = document.createElement('div');
    const workoutCardBody = document.createElement('div');
    const workoutCardTitle = document.createElement('h5');
    const logWorkoutBtn = document.createElement('button');

    workoutCardBody.classList.add('card-body', 'py-0');
    workoutCard.classList.add('card', 'text-center');
    workoutCardTitle.classList.add('card-title', 'p-3', 'text-center');
    logWorkoutBtn.classList.add('btn', 'btn-success');

    workout.exercises.forEach(exercise => {
      const exerciseDiv = document.createElement('div');
      const nameP = document.createElement('p');
      const descriptionP = document.createElement('p');
      const setsAndRepsP = document.createElement('p');
      const weightUsedInput = document.createElement('input');
      const weightUsedLabel = document.createElement('label');
      const lineDiv = document.createElement('div');
      const line = document.createElement('hr');


      weightUsedInput.type = 'number';
      weightUsedInput.name = 'weightUsed';
      weightUsedInput.classList.add('ml-2');
      weightUsedLabel.for = 'weightUsed';
      weightUsedLabel.textContent = 'Weight Used: ';
      nameP.textContent = exercise.name;
      descriptionP.textContent = fixDescriptionTextContent(descriptionP, exercise)
      setsAndRepsP.textContent = `Sets: ${workout.sets} --- Reps Per Set: ${workout.reps_per_set}`
      lineDiv.append(line);
      exerciseDiv.append(nameP, descriptionP, setsAndRepsP, weightUsedLabel, weightUsedInput, lineDiv);
      workoutCardBody.append(exerciseDiv);
    })
    logWorkoutBtn.type = 'button';
    logWorkoutBtn.textContent = 'Log Workout';
    workoutCardTitle.textContent = `${capitalize(workout.muscle_group)} - ${workoutType}`;
    
    workoutCard.append(workoutCardTitle, workoutCardBody, logWorkoutBtn);
    workoutCardDiv.append(workoutCard);
    addLogWorkoutBtnEventListener(logWorkoutBtn, workoutCard);
  })
}

const fixDescriptionTextContent = (descriptionP, exercise) => {
  descriptionP.textContent = exercise.description.replace(/<p>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<\/p>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<\/em>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<em>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<\/li>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<li>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<\/ul>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<ul>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<strong>/g, '');
  descriptionP.textContent = descriptionP.textContent.replace(/<\/strong>/g, '');
  return descriptionP.textContent
}

const addLogWorkoutBtnEventListener = (button, card) => {
  button.addEventListener('click', () => {
    card.remove();
  })
}

moreParamsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const extraParams = captureParamsFormData(event);
  generateWorkout(extraParams);
})

const captureParamsFormData = (event) => {
  const extraParams = new FormData(event.target);
  const muscleGroup = extraParams.get('muscle-group');
  const strengthOrHyper = extraParams.get('strength-or-hyper');
  const muscleAndTypeParams = { muscleGroup, strengthOrHyper };
  return muscleAndTypeParams;
}
