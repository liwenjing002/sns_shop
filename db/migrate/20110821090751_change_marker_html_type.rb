class ChangeMarkerHtmlType < ActiveRecord::Migration
  def self.up
    change_column :markers,:marker_html,:text
  end

  def self.down
  end
end
