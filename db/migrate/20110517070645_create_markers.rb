class CreateMarkers < ActiveRecord::Migration
  def self.up
    create_table :markers do |t|
	  t.string :marker_html #marker内容 html格式，图片或文字
	  t.integer :marker_type #类型，当前位置，我家，文字，图片，等，可定义
	  t.string :marker_latitude
      t.string :marker_longitude 
      t.string :privaty #marker 单个的隐私控制
      t.timestamps
    end
  end

  def self.down
    drop_table :markers
  end
end
