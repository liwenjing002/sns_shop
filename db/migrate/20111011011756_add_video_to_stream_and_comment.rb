class AddVideoToStreamAndComment < ActiveRecord::Migration
  def self.up
    add_column :videos,:stream_item_id,:integer
    add_column :comments,:video_id,:integer
  end

  def self.down
    remove_column :videos,:stream_item_id
    remove_column :comments,:video_id
  end
end
