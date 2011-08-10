class AddLocationPipNote < ActiveRecord::Migration
  def self.up
    add_column :pictures,:location,:string
    add_column :pictures,:l_coordinate,:string
    add_column :pictures,:destination,:string
    add_column :pictures,:d_coordinate,:string
    
    add_column :notes,:location,:string
    add_column :notes,:l_coordinate,:string
    add_column :notes,:destination,:string
    add_column :notes,:d_coordinate,:string
  end

  def self.down
  remove_column :pictures,:location
  remove_column :pictures,:l_coordinate
  remove_column :pictures,:destination
  remove_column :pictures,:d_coordinate
    
  remove_column :notes,:location
  remove_column :notes,:l_coordinate
  remove_column :notes,:destination
  remove_column :notes,:d_coordinate
  end
end
