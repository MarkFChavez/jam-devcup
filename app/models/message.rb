class Message < ActiveRecord::Base
  belongs_to :user

  validates :subject, presence: true
  validates :body, presence: true
  validates :send_at, presence: true

  scope :inactive, -> { where(state: :inactive) }
  scope :pending, -> { where(state: :pending) }
  scope :sent, -> { where(state: :sent) }

  state_machine :state, initial: :inactive do
    event :go_to_pending do
      transition any => :pending
    end

    event :go_to_sent do
      transition pending: :sent
    end
  end

  def time_to_send?
    now = DateTime.parse(Time.now.to_s)
    now = now.change(offset: "+0000")

    current = DateTime.parse(self.send_at.to_s)
    current = current.change(offset: "+0000")

    now >= current
  end
end
