class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:index, :create]

  def index
    @users = User.all
    render json: @users
  end

  def profile
    render json: @user
  end

  def create
    @user = User.create(
      username: params[:username],
      password: params[:password],
      height: params[:height],
      weight: params[:weight],
      frequency_per_week: params[:frequencyPerWeek],
      gym_time_per_session: params[:gymTimePerSession]
    )
    render json: @user
  end

  def update
    @user.update(
      username: params[:username],
      height: params[:height],
      weight: params[:weight],
      frequency_per_week: params[:frequencyPerWeek],
      frequency_per_week: params[:frequencyPerWeek],
      gym_time_per_session: params[:gymTimePerSession]
    )
    render json: @user
  end
end
