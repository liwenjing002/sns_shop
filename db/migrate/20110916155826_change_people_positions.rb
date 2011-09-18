class ChangePeoplePositions < ActiveRecord::Migration
  def self.up
    remove_column :postitions,:home_latitude
    remove_column :postitions,:home_longitude
    remove_column :postitions,:home_address
    remove_column :people,:latitude
    remove_column :people,:longitude
    remove_column :people,:postition_id
    add_column :people,:home_address,:string
     add_column :postitions,:person_id,:string
  end

  def self.down
    add_column :postitions,:home_latitude,:string
    add_column :postitions,:home_longitude,:string
    add_column :people,:latitude,:people,:string
    add_column :people,:longtitude,:string
    add_column :people,:postition_id,:string
    remove_column :people,:home_address
     remove_column :postitions,:person_id
  end
end
