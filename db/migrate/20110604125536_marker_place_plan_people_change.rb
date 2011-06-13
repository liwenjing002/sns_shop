class MarkerPlacePlanPeopleChange < ActiveRecord::Migration
  def self.up
    remove_column :maps,:people_id
    add_column :maps,:person_id,:integer
    remove_column :markers,:map_id
    add_column :markers,:owner_id,:integer #拥有人，拥有人可以转移
    
   
    
    add_column :places,:marker_id,:integer
    
  end

  def self.down
    add_column :maps,:people_id,:integer
    remove_column :maps,:person_id
    remove_column :markers,:owner_id #拥有人，拥有人可以转移
    remove_column :places,:marker_id
    
  end
end
