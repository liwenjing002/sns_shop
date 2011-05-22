class AddPlaceToAlbums < ActiveRecord::Migration
  def self.up
    add_column :albums,:place_id,:integer
    add_column :stream_items,:place_id,:integer
    
    add_column :places,:is_public,:boolean
  end

  def self.down
        remove_column :albums,:place_id
    remove_column :stream_items,:place_id
    remove_column :places,:is_public
  end
end
