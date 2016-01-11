class CreateCommutes < ActiveRecord::Migration
  def change
    create_table :commutes do |t|
    	t.string :start_station, null: false
    	t.string :end_station, null: false
      t.timestamps null: false
    end
  end
end
