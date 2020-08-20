const myProfileDiv = document.querySelector('#my-profile');
const userURL = 'http://localhost:3000/users';
const profileURL = 'http://localhost:3000/profile';
const loginURL = 'http://localhost:3000/login';
const editUserForm = document.querySelector('#edit-user-form');
const workoutsURL = 'http://localhost:3000/workouts';
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const usernameField = document.querySelector("#username");
const heightField = document.querySelector('#height');
const weightField = document.querySelector('#weight');
const frequencyField = document.querySelector('#frequency');
const logoutBtn = document.querySelector('#logout-btn');

const captureEditUserFormData = (event) => {
  const editUserFormData = new FormData(event.target);
  const username = editUserFormData.get('username');
  const password_digest = editUserFormData.get('password');
  const height = parseInt(editUserFormData.get('height'));
  const weight = parseInt(editUserFormData.get('weight'));
  const frequencyPerWeek = parseInt(editUserFormData.get('frequency-per-week'));
  const gymTimePerSession= editUserFormData.get('gym-time-per-session');
  const user = { username, password_digest, height, weight, frequencyPerWeek, gymTimePerSession };
  return user
}

const renderProfile = (user) => {
  usernameField.value = user.username;
  heightField.value = user.height;
  weightField.value = user.weight;
  passwordInput.value = user.password_digest;
  editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    user = captureEditUserFormData(event);
    editUser(user);
  })
}

logoutBtn.addEventListener('click', () => {
  window.location.replace('index.html');
  localStorage.removeItem('token');
})

document.addEventListener('DOMContentLoaded', fetch(profileURL, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }
}).then(response => response.json())
  .then(renderProfile))

const editUser = (user) => {
  console.log(user);
  fetch(`${userURL}/${user.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
}

logoutBtn.addEventListener('click', () => {
  window.location.replace('index.html');
  localStorage.removeItem('token');
})