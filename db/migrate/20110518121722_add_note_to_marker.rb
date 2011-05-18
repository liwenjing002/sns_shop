class AddNoteToMarker < ActiveRecord::Migration
  def self.up
    add_column :markers, :object_type ,:string
    add_column :markers, :object_id,:integer
  end

  def self.down
    remove_column :markers,:object_type
    remove_column :markers,:object_id
  end
end
