class AddStreamToPlace < ActiveRecord::Migration
  def self.up
    add_column :places,:stream_item_id,:integer
  end

  def self.down
  remove_column :places,:stream_item_id
  end
end
