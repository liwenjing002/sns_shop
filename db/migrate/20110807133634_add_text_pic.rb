class AddTextPic < ActiveRecord::Migration
  def self.up
    add_column :pictures,:photo_text,:text
  end

  def self.down
    remove_column :pictures,:photo_text
  end
end
