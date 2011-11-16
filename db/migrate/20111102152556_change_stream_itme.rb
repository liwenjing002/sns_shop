class ChangeStreamItme < ActiveRecord::Migration
  def self.up
    add_column :stream_items,:marker_id,:integer
    remove_column :stream_items,:place_id
  end

  def self.down
  remove_column :stream_items,:marker_id
  add_column :stream_items,:place_id,:integer
  end
end
