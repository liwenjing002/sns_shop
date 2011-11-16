class AddPlaceShreToPlace < ActiveRecord::Migration
  def self.up
    add_column :place_shares,:place_id,:integer
  end

  def self.down
    remove_column :place_shares,:place_id
  end
end
