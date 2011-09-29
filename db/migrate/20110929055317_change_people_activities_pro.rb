class ChangePeopleActivitiesPro < ActiveRecord::Migration
  def self.up
    rename_column :people,:activities,:love_activities
  end

  def self.down
    rename_column :people,:love_activities,:activities
  end
end
