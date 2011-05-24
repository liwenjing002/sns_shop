class CreatePlans < ActiveRecord::Migration
  def self.up
    create_table :plans do |t|
	  t.datetime :day
	  t.string :province 
	  t.string :city
	  t.string :county
	  t.string :address
      t.timestamps
    end
  end

  def self.down
    drop_table :plans
  end
end
