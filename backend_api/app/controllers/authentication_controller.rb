class AuthenticationController < ApplicationController
  def login
    @user = User.find_by username: params[:username]
    if !@user
      render json: {error: "Wrong username"}, status: :unauthorized
    else
      if !@user.authenticate params[:password]
        render json: {error: "Wrong password"}
      else
        payload = {
          user_id: @user.id
        }
        secret = "some_secret"
        token = JWT.encode payload, secret
        render json: {token: token}
      end
    end
  end
end
