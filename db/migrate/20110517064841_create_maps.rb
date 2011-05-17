class CreateMaps < ActiveRecord::Migration
  def self.up
    create_table :maps do |t|
      t.integer :people_id
      t.string :center_latitude
      t.string :center_longitude
      t.integer :zoom
      t.timestamps
    end
  end

  def self.down
    drop_table :maps
  end
end
