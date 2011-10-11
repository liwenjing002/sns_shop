class CreateVideos < ActiveRecord::Migration
  def self.up
    create_table :videos do |t|
      t.string :name
      t.string :desc
      t.string :video_url
      t.string :screenshots_url
      t.integer :person_id
      t.string :location
      t.string :longitude
      t.string :latitude
      t.integer :marker_id
      t.timestamps
    end
  end

  def self.down
    drop_table :videos
  end
end
