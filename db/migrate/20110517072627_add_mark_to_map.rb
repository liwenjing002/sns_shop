class AddMarkToMap < ActiveRecord::Migration
  def self.up
	add_column :markers, :map_id, :integer 

    add_index "markers", ["map_id"], :name => "index_map_id_on_markers"
  end

  def self.down
	remove_column :markers, :maps_id
  end
end
