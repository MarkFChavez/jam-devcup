class MessagesController < ApplicationController
  def create
    @message = current_user.messages.build(message_params)
    @message.send_at = 1.minute.from_now # temp
    @message.save!

    redirect_to root_url, notice: "Success"

  rescue ActiveRecord::RecordInvalid
    redirect_to root_url, alert: "Error"
  end

  private

  def message_params
    params.require(:message).
      permit(:subject, :body, :send_at)
  end
end
