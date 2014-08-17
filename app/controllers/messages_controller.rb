class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.save!

    redirect_to root_url, notice: "Success"

  rescue ActiveRecord::RecordInvalid
    redirect_to root_url, alert: "Error"
  end

  private

  def message_params
    params.require(:message).
      permit(:recipient, :subject, :body, :send_at)
  end
end
