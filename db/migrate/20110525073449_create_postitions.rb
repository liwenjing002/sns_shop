class CreatePostitions < ActiveRecord::Migration
  def self.up
    create_table :postitions do |t|
	  t.string :home_latitude
	  t.string :home_longitude
	  t.string :home_address
	  t.string :current_latitude
	  t.string :current_longitude
	  t.string :current_address
      t.timestamps
    end
	
	add_column :people,:postition_id,:integer
    add_index "people", ["postition_id"], :name => "index_postitionid_on_people"	
  end

  def self.down
    drop_table :postitions
	remove_column :people,:postition_id
  end
end
