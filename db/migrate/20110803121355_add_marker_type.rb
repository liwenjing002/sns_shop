class AddMarkerType < ActiveRecord::Migration
  def self.up
    add_column :marker_to_maps,:marker_type,:string
    remove_column :markers,:marker_type
  end

  def self.down
     remove_column :marker_to_maps,:marker_type
    add_column :markers,:marker_type,:string
  end
end
