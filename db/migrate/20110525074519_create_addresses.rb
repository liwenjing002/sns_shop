class CreateAddresses < ActiveRecord::Migration
  def self.up
    create_table :addresses do |t|
	  t.integer :father_id
	  t.string :description
      t.timestamps
    end
  end

  def self.down
    drop_table :addresses
  end
end
