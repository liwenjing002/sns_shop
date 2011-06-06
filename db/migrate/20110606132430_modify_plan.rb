class ModifyPlan < ActiveRecord::Migration
  def self.up
    add_column :plans,:days_num,:integer
    add_column :plans,:travel_way,:string
    add_column :plans,:accommodation,:string
    add_column :plans,:food_taste,:string
    add_column :plans,:play_interesting,:string
    add_column :plans,:play_way,:string
    
    
  end

  def self.down
  end
end
