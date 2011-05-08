class AddCountyAdress < ActiveRecord::Migration
  def self.up
    add_column :addresses,:hometown_county,:string
    add_column :addresses,:liveing_county,:string
    add_column :addresses,:current_county,:string
  end

  def self.down
    remove_column :addresses,:hometown_county
    remove_column :addresses,:liveing_county
    remove_column :addresses,:current_county
  end
end
