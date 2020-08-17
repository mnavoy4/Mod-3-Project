const signInBtn = document.querySelector("#sign-in-submit");
const createProfileBtn = document.querySelector("#create-profile-btn");
const formDiv = document.querySelector("#sign-in-form-div");
const signInForm = document.querySelector("#sign-in-form");
const createNewUserFormDiv = document.querySelector("#create-new-user-form-div");
const createNewUserForm = document.querySelector("#create-new-user");
const createNewAndSignInBtn = document.querySelector("#create-new-and-sign-in")


signInBtn.addEventListener('submit', (event) => {
  event.preventDefault();
});

createProfileBtn.addEventListener('click', (event) => {
  createProfileBtn.remove();
  signInForm.remove();
  createNewUserForm.classList.remove('d-none');
})

createNewAndSignInBtn.addEventListener('submit', (event) => {
  event.preventDefault();
})




