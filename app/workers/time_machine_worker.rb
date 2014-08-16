class TimeMachineWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence do
    minutely
  end
  
  def perform(last_occurence = nil, current_occurence = nil)
    puts "Hi, from past!"
  end
end
