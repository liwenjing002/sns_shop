class UpdateVideo < ActiveRecord::Migration
  def self.up
    chang_column :videos,:desc,:text
  end

  def self.down
  end
end
