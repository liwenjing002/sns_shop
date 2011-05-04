class CreateAddresses < ActiveRecord::Migration
  def self.up
    create_table :addresses do |t|
      t.string :hometown_address
      t.string :hometown_province
      t.string :hometown_city
      t.string :liveing_address
      t.string :liveing_city
      t.string :liveing_province
      t.string :current_address
      t.string :current_province
      t.string :current_city
      t.timestamps
    end
  end

  def self.down
    drop_table :addresses
  end
end