class CreateMarkerToMaps < ActiveRecord::Migration
  def self.up
    create_table :marker_to_maps do |t|
      t.integer :map_id
      t.integer :marker_id
    end
    
  end

  def self.down
    drop_table :mark_to_maps
  end
end
