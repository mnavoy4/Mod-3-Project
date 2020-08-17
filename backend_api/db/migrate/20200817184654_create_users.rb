class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :height
      t.integer :weight
      t.integer :frequency_per_week
      t.string :gym_time_per_session

      t.timestamps
    end
  end
end
