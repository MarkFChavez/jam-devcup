class HomeController < ApplicationController
  def index
    @message = current_user.messages.build
    
    # if current_user.from_facebook?
    #   render 'home/facebook/index'
    # else
    #   @message = current_user.messages.build
    #   render 'home/index'
    # end
  end
end
