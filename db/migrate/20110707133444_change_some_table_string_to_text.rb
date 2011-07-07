class ChangeSomeTableStringToText < ActiveRecord::Migration
  def self.up
    change_column :markers,:marker_html,:text
    change_column :places,:place_description,:text
  end

  def self.down
  end
end
