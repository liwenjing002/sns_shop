class AddTravelToMarker < ActiveRecord::Migration
  def self.up
    add_column :markers,:travel_type,:string
  end

  def self.down
    remove_column :markers,:travel_type
  end
end
