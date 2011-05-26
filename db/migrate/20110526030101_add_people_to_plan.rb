class AddPeopleToPlan < ActiveRecord::Migration
  def self.up
	add_column :plans,:person_id,:integer
  end

  def self.down
	remove_column :plans,:person_id
  end
end
