class WorkoutsController < ApplicationController
  skip_before_action :authenticate, only: [:index]

  def index
    @workouts = Workout.all
    render json: @workouts, include: :exercises
  end

  def create
    if @user.gym_time_per_session == '.5hr-1hr'
      sets = 3
      number_of_exercises = 4
    elsif @user.gym_time_per_session == '1hr-1.5hr'
      sets = 4
      number_of_exercises = 5
    elsif @user.gym_time_per_session == '1.5hr+'
      sets = 5
      number_of_exercises = 6
    end
    if params[:strengthOrHyper] == 'hyper'
      reps = 10
      strength = false
    elsif params[:strengthOrHyper] == 'strength'
      reps = 5
      strength = true
    end
    # byebug


    @workout = Workout.create(
      user_id: @user.id,
      sets: sets,
      reps_per_set: reps,
      strength: strength,
      muscle_group: params[:muscleGroup]
    )

    @exercises = Exercise.where(muscle_group: params[:muscleGroup]).sample(number_of_exercises)
    @exercises.each do |exercise|
      WorkoutExercise.create(
        workout_id: @workout.id,
        exercise_id: exercise.id
      )
    end

    render json: @workout, include: :exercises
  end
end
