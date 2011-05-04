class AddPeopleToAddress < ActiveRecord::Migration
  def self.up
    add_column :people,:address_id,:integer
    add_index "people", ["address_id"], :name => "index_address_id_on_people"
  end

  def self.down
    remove_column :people,:address_id
  end
end
