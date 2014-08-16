class TimeMachineWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence do
    minutely
  end
  
  def perform(last_occurence = nil, current_occurence = nil)
    @inactive_messages = Message.inactive

    @inactive_messages.each do |message|
      if message.time_to_send?
        # EmailWorker.perform_async(message.id)
        puts 'Send the email'
      end
    end
  end
end
