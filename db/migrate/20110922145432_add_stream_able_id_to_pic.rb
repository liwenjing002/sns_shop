class AddStreamAbleIdToPic < ActiveRecord::Migration
  def self.up
    add_column :pictures,:stream_item_id,:string
  end

  def self.down
  remove_column :pictures,:stream_item_id
  end
end
