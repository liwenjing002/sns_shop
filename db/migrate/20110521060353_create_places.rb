class CreatePlaces < ActiveRecord::Migration
  def self.up
    create_table :places do |t|
      t.string :place_name
      t.string :place_type
      t.string :place_latitude
      t.string :place_longitude
      t.string :place_description
      t.timestamps
    end
  end

  def self.down
    drop_table :places
  end
end
