class AddMapPeople < ActiveRecord::Migration
  def self.up
		add_column :people, :latitude, :float #you can change the name, see wiki
        add_column :people, :longitude, :float #you can change the name, see wiki
        add_column :people, :gmaps, :boolean #not mandatory, see wiki
  end

  def self.down
	
  end
end
