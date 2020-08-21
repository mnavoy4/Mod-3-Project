# GitFit v2
___
A web app for generating a days workout based on the users profile and targeted muscle group.

Alt-H Guide
___
  1.  Basic Info
  2.  Demo
  3.  Supporting Technologies
  4.  Install and Setup
  5.  Features
  6.  Status
  7.  Contact
  8.  License

### 1. Basic Info
___
GitFit is a workout generator that creates the users workout for the day based on the users profile, targeted muscle group, and workout type (strength or hypertrophy). It then populates the users calender with their workout and allows you to track the weight the user used for each exercise in order to track progress. The app is designed for users that may not know much about health and fitness and is meant to take the guesswork out of the equation for users who may be new to exercising but want to improve their health.

### 2. Demo
___
youtube link

### 3.  Supporting Technologies
___

- Ruby on Rails -> 2.6.1
- ActiveRecord -> 6.0
- Sinatra-ActiveRecord -> 2.0
- SQLite3 -> 1.4

### 4.  Install and Setup
___
To run GitFit, clone it from the GitHub repository and install locally.

Run commands in backend:
```
rails db:migrate
rails db:seed
rails s

```
Run commands in frontend:
```
lite-server

```

### 5. Features
___

  - Create new User profile
  - Edit User profile
  - Generate the days workout and populate the Users calender
  - Track progress by recording the weight used for exercises
  - Browse all completed workouts

  ___
  ``` 
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
  ```
  ```
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
  ```
  ___

  ###  6.  Status
___

  Current status:  Functional MVP completed
  
  To-do's:

  - [x] Generate workout
  - [x] Populate calender with workout 
  - [x] Record progress
  - [x] View all completed workouts
  - [ ] Add images of exercises and links to health and fitness research
  


  ### 7.  Contact
  ___
  GitFit was created by [Michael Navoy](https://www.linkedin.com/in/michael-navoy/).
  
  ### 8. Licence
  ___
  [Click here to view](insert license)