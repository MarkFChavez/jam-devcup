class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :subject
      t.text :body
      t.datetime :send_at
      t.integer :user_id

      t.timestamps
    end
    add_index :messages, :user_id
  end
end
