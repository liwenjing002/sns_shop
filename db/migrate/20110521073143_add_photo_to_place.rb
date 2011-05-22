class AddPhotoToPlace < ActiveRecord::Migration
  def self.up
    change_table :places do |t|
      t.string :photo_file_name, :photo_content_type
      t.string :photo_fingerprint, :limit => 50
      t.integer :photo_file_size
      t.datetime :photo_updated_at
    end
    
    add_column :attachments,:place_id,:integer
    
    add_column :memberships,:place_id,:integer
  end

  def self.down
    change_table :places do |t|
      t.remove :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at, :photo_fingerprint
    end
    remove_column :attachments,:place_id
    remove_column :memberships,:place_id
  end
end
