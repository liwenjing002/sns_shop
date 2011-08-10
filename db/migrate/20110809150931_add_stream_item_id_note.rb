class AddStreamItemIdNote < ActiveRecord::Migration
  def self.up
    add_column :notes,:stream_item_id,:integer
  end

  def self.down
    remove_column :notes,:stream_item_id
  end
end
