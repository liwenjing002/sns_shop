class AddGeocodePositionToMarker < ActiveRecord::Migration
  def self.up
	add_column :markers, :geocode_position,:string
  end

  def self.down
	remove_column :markers,:geocodePosition
  end
end
