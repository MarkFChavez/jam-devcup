class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.save!

    redirect_to root_url, notice: "Success! Message has been created."

  rescue ActiveRecord::RecordInvalid
    redirect_to root_url, alert: "All fields are required"
  end

  private

  def message_params
    params.require(:message).
      permit(:recipient, :subject, :body, :send_at)
  end
end
