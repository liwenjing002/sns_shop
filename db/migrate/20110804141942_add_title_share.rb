class AddTitleShare < ActiveRecord::Migration
  def self.up
    add_column :shares,:title,:string
  end

  def self.down
     remove_column :shares,:title
  end
end
