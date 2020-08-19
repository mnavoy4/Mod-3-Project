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

const renderProfile = (user) => {
  console.log(user);

  usernameField.value = user.username;
  heightField.value = user.height;
  weightField.value = user.weight;
  passwordInput.value = user.password_digest;
  editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editUser(user);
  })
}

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
    // .then(response => console.log(response))
}

// const captureNewUserFormData = (event) => {
//   const createUserFormData = new FormData(event.target);
//   const user_id = createUserFormData.get('id');
//   const username = createUserFormData.get('username');
//   const password_digest = createUserFormData.get('password');
//   const height = parseInt(createUserFormData.get('height'));
//   const weight = parseInt(createUserFormData.get('weight'));
//   const frequencyPerWeek = parseInt(createUserFormData.get('frequency-per-week'));
//   const gymTimePerSession= createUserFormData.get('gym-time-per-session');
//   const user = { user_id, username, password_digest, height, weight, frequencyPerWeek, gymTimePerSession };
//   return user
// } 