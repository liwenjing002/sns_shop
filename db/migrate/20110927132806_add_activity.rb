class AddActivity < ActiveRecord::Migration
  def self.up
    create_table :activities do |t|
      t.string :name
      t.datetime :activity_time
      t.string :location
      t.datetime :apply_time
      t.string :charge_people
      t.string :charge_phone
      t.string :lasting_time
      t.string :activity_spend
      t.text :activity_memo
      t.integer :create_id
    end
    
    create_table :activity_people do|t|
      t.integer :activity_id
      t.integer :people_id
    end
  end

  def self.down
    drop_table :activities
    drop_table :activity_people
  end
end
