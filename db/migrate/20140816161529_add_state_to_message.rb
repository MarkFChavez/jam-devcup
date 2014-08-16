class AddStateToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :state, :string, default: :inactive
  end
end
