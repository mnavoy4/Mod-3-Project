class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.create(
      username: params[:username],
      password: params[:password],
      height: params[:height],
      weight: params[:weight],
      frequency_per_week: params[:frequency_per_week],
      gym_time_per_session: params[:gym_time_per_session]
    )
    render json: @user
  end
end
