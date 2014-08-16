class HomeController < ApplicationController
  def index
    @message = current_user.messages.build
  end
end
