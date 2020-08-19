const signInBtn = document.querySelector("#sign-in-submit");
const createProfileBtn = document.querySelector("#create-profile-btn");
const formDiv = document.querySelector("#sign-in-form-div");
const signInForm = document.querySelector("#sign-in-form");
const createNewUserFormDiv = document.querySelector("#create-new-user-form-div");
const createNewUserForm = document.querySelector("#create-new-user");
const createNewAndSignInBtn = document.querySelector("#create-new-and-sign-in");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const userURL = 'http://localhost:3000/users';
const loginURL = 'http://localhost:3000/login';


const loginUser = (event) => {
  const loginFormData = new FormData(event.target);
  const username = loginFormData.get('username');
  const password = loginFormData.get('password');
  const user = { username, password };
  fetch(loginURL, {
    method: "POST",
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(result => localStorage.setItem('token', result.token))
    .then(() => window.location.href = `main.html?username=${username}`);
    return username
}


signInForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = loginUser(event);
});

createProfileBtn.addEventListener('click', (event) => {
  createProfileBtn.remove();
  signInForm.remove();
  createNewUserForm.classList.remove('d-none');
})

createNewUserForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (passwordInput.value != confirmPasswordInput.value){
    alert("Your passwords do not match!")
  };
  const newUser = captureNewUserFormData(event)
  console.log(newUser);
  createNewUser(newUser);
  loginUser(event);
})

const createNewUser = (user) => {
  fetch(userURL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
}

const captureNewUserFormData = (event) => {
  const createUserFormData = new FormData(event.target);
  const username = createUserFormData.get('username');
  const password = createUserFormData.get('password');
  const height = parseInt(createUserFormData.get('height'));
  const weight = parseInt(createUserFormData.get('weight'));
  const frequencyPerWeek = parseInt(createUserFormData.get('frequency-per-week'));
  const gymTimePerSession= createUserFormData.get('gym-time-per-session');
  const user = { username, password, height, weight, frequencyPerWeek, gymTimePerSession };
  console.log(user);
  return user
} 



