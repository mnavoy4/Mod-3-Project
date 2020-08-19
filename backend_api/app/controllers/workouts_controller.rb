class WorkoutsController < ApplicationController
  skip_before_action :authenticate, only: [:index]

  def index
    @workouts = Workout.all
    render json: @workouts
  end

  def create
  #   @user = {
  #     id: 1,
  #     username: "mnavoy4",
  #     password_digest: "$2a$12$dYsoKzd9SxtKgP2n68eW.uLNTTbHX2rCjzBFOfBEFdM5xH0XUYahu",
  #     height: 72,
  #     weight: 165,
  #     frequency_per_week: 6,
  #     gym_time_per_session: "1-1.5",
  # }
    
    

    @workout = Workout.create(
      user_id: @user.id,
      sets: params[:sets],
      reps_per_set: params[:reps_per_set],
      strength: params[:strength],
      muscle_group: params[:muscle_group]
    )
    render json: @workout
  end
end
