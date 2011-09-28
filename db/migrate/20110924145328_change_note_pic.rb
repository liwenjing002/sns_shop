class ChangeNotePic < ActiveRecord::Migration
  def self.up
    remove_column :notes,:l_coordinate
    remove_column :notes,:d_coordinate
    remove_column :pictures,:l_coordinate
    remove_column :pictures,:d_coordinate
    
    add_column :notes,:latitude,:string
    add_column :notes,:longitude,:string
    add_column :pictures,:latitude,:string
    add_column :pictures,:longitude,:string
    
  end

  def self.down
    add_column :notes,:l_coordinate,:string
    add_column :notes,:d_coordinate,:string
    add_column :pictures,:l_coordinate,:string
    add_column :pictures,:d_coordinate,:string
    
    remove_column :notes,:latitude
    remove_column :notes,:longitude
    remove_column :pictures,:latitude
    remove_column :pictures,:longitude
  end
end
