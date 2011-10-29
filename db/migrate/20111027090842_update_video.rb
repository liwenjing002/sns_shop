class UpdateVideo < ActiveRecord::Migration
  def self.up
    change_column :videos,:desc,:text
  end

  def self.down
  end
end
