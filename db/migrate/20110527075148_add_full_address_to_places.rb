class AddFullAddressToPlaces < ActiveRecord::Migration
  def self.up
	add_column :places,:full_address,:string
  end

  def self.down
	remove_column :places,:full_address
  end
end
