class TimeMachineWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence do
    minutely
  end
  
  def perform(last_occurence = nil, current_occurence = nil)
    @inactive_messages = Message.inactive

    @inactive_messages.each do |message|
      EmailWorker.perform_async(message.id) if message.time_to_send?
    end
  end
end
