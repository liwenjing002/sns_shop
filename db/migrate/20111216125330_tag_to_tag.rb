class TagToTag < ActiveRecord::Migration
  def self.up
    add_column :tags,:tag_type,:string
    create_table :tag_to_tags do |t|
      t.integer :tag_from_id
      t.integer :tag_to_id
    end
  end

  def self.down
  end
end
