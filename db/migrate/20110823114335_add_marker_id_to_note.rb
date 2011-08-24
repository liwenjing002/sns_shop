class AddMarkerIdToNote < ActiveRecord::Migration
  def self.up
    add_column :notes,:marker_at_id,:integer
    add_column :notes,:marker_to_id,:integer
  end

  def self.down
     remove_column :notes,:marker_at_id
     remove_column :notes,:marker_to_id
  end
end
