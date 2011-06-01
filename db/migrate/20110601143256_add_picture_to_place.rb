class AddPictureToPlace < ActiveRecord::Migration
  def self.up
    remove_column :places,:photo_file_name
    remove_column :places, :photo_content_type
    remove_column :places, :photo_fingerprint
    remove_column :places, :photo_file_size
    remove_column :places, :photo_updated_at
    
    add_column :places,:picture_id,:integer
    remove_column :attachments,:place_id

  end

  def self.down
    remove_column :places, :picture_id
    change_table :places do |t|
      t.string :photo_file_name, :photo_content_type
      t.string :photo_fingerprint, :limit => 50
      t.integer :photo_file_size
      t.datetime :photo_updated_at
    end
    add_column :attachments,:place_id,:integer
  end
end
