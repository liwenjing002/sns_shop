class AddPlaceShareComment < ActiveRecord::Migration
  def self.up
   add_column :comments,:place_share_id,:integer
   add_column :place_shares,:is_public,:boolean
  end

  def self.down
    remove_column :comments,:place_share_id
    remove_column :place_share,:is_public
  end
end

