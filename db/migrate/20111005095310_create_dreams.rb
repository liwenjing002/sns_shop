class CreateDreams < ActiveRecord::Migration
  def self.up
    create_table :dreams do |t|
      t.string :name
      t.string :desc
      t.text :detail

      t.timestamps
    end
  end

  def self.down
    drop_table :dreams
  end
end
