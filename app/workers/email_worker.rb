class EmailWorker
  include Sidekiq::Worker

  def perform(message_id)
    message = Message.inactive.find(message_id)
    message.go_to_pending

    send_email(message)
  end

  def send_email(message)
    TimeMachineMailer.send_to_future(message.id).deliver!
    message.go_to_sent
  end
end
