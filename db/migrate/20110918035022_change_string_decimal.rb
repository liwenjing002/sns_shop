class ChangeStringDecimal < ActiveRecord::Migration
  def self.up
    change_column :markers,:marker_latitude,:decimal, :precision => 15, :scale => 12
    change_column :markers,:marker_longitude,:decimal, :precision => 15, :scale => 12
    change_column :postitions,:current_longitude,:decimal, :precision => 15, :scale => 12
    change_column :postitions,:current_latitude,:decimal, :precision => 15, :scale => 12
  end

  def self.down
    change_column :markers,:marker_latitude,:string
    change_column :markers,:marker_longitude,:string
     change_column :postitions,:current_longitude,:string
    change_column :postitions,:current_latitude,:dstring
  end
end
