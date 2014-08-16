class TimeMachineMailer < ActionMailer::Base
  default from: "jamdevcup2014@gmail.com"

  def send_to_future(message_id)
    @message = Message.pending.find(message_id)
    mail :to => "mchavez@you-source.com", :subject => "DEVCUP"
  end
end
