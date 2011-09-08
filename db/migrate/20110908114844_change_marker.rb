class ChangeMarker < ActiveRecord::Migration
  def self.up
    add_column :markers,:destin_position,:string
    add_column :markers,:destin_latitude,:string
    add_column :markers,:destin_longitude,:string
    remove_column :markers,:is_destin
  end

  def self.down
    remove_column :markers,:destin_position
    remove_column :markers,:destin_latitude
    remove_column :markers,:destin_longitude
    add_column :markers,:is_destin,:string
  end
end
