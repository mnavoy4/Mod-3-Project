class WorkoutsController < ApplicationController
  before_action :authenticate, only: [:create]
end
