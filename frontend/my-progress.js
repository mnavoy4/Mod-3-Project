const myWorkoutsUrl = 'http://localhost:3000/show_all';
const logoutBtn = document.querySelector('#logout-btn');
const myWorkoutsDiv = document.querySelector('#my-workouts');

const fetchMyWorkouts = () => {
  fetch(myWorkoutsUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  }).then(response => response.json())
    .then(renderMyWorkouts)
}

const renderMyWorkouts = (workouts) => {
  workouts.forEach(workout => {
    const workoutCard = document.createElement('div');
    const workoutCardBody = document.createElement('div');
    const workoutCardTitle = document.createElement('h5');
    const exerciseListUl = document.createElement('ul');
    const setsAndRepsP = document.createElement('p');
    const lineDiv = document.createElement('div');
    const line = document.createElement('hr');

    workoutCardBody.classList.add('card-body', 'py-0');
    workoutCard.classList.add('card', 'text-center', 'col-3', 'm-2');
    workoutCardTitle.classList.add('card-title', 'pt-3', 'text-center', 'mb-0', 'pb-0');
    exerciseListUl.classList.add('pl-0');

    workout.exercises.forEach(exercise => {
      const exerciseLi = document.createElement('li');
      exerciseLi.textContent = exercise.name;
      exerciseListUl.append(exerciseLi);
    })
    if (workout.strength == true) {
      workoutType = 'Strength';
    } else if (workout.strength == false) {
      workoutType = 'Hypertrophy';
    }

    setsAndRepsP.textContent = `Sets: ${workout.sets} --- Reps Per Set: ${workout.reps_per_set}`;
    workoutCardTitle.textContent = `${capitalize(workout.muscle_group)} - ${workoutType}`
    lineDiv.append(line);
    workoutCardBody.append(workoutCardTitle, lineDiv, setsAndRepsP, exerciseListUl);
    workoutCard.append(workoutCardBody);
    myWorkoutsDiv.append(workoutCard);
  })
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


logoutBtn.addEventListener('click', () => {
  window.location.replace('index.html');
  localStorage.removeItem('token');
})

document.addEventListener('DOMContentLoaded', fetchMyWorkouts)