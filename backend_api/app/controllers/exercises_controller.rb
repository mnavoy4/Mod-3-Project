class ExercisesController < ApplicationController
  skip_before_action :authenticate, only: [:index]
  
  def index
    @exercises = Exercise.all
    render json: @exercises
  end
end
