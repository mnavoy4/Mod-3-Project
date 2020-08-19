Rails.application.routes.draw do
  resources :workout_exercises
  resources :workouts
  resources :exercises
  resources :users
  post 'login', to: 'authentication#login'
  get 'profile', to: 'users#profile'
end
