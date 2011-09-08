class AddIsDestinationToMark < ActiveRecord::Migration
  def self.up
    add_column :markers,:is_destin,:boolean
  end

  def self.down
    remove_column :markers,:is_destin
  end
end
