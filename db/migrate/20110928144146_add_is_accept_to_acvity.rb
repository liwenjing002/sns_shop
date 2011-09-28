class AddIsAcceptToAcvity < ActiveRecord::Migration
  def self.up
    add_column :people_activities,:status,:string
  end

  def self.down
    remove_column :people_activities,:status
  end
end
