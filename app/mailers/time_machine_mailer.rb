class TimeMachineMailer < ActionMailer::Base
  default from: "jamdevcup2014@gmail.com"

  def send_to_future(message_id)
    @message = Message.pending.find(message_id)
    mail :to => @message.recipient, :subject => @message.subject
  end
end
