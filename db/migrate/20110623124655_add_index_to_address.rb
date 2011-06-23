class AddIndexToAddress < ActiveRecord::Migration
  def self.up
    add_index :addresses, :father_id
    add_index :addresses, :description
  end

  def self.down
  end
end
