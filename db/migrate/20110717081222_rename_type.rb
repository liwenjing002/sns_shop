class RenameType < ActiveRecord::Migration
  def self.up
    remove_column :place_shares,:type
    add_column :place_shares,:share_type,:string
  end

  def self.down
    remove_column :place_shares,:share_type
    add_column :place_shares,:type,:string
  end
end
