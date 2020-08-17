class CreateWorkouts < ActiveRecord::Migration[6.0]
  def change
    create_table :workouts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :exercise, null: false, foreign_key: true
      t.integer :sets
      t.integer :reps_per_set
      t.boolean :strength
      t.string :muscle_group

      t.timestamps
    end
  end
end
