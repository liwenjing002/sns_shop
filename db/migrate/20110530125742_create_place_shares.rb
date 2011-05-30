class CreatePlaceShares < ActiveRecord::Migration
  def self.up
    create_table :place_shares do |t|
      t.string :text
      t.string :type #addvise,question
      t.integer :picture_id
      t.integer :stream_item_id
      t.timestamps
    end
    add_column :pictures,:type,:string #图片类型，sigle，单独的图片，mix，混杂在其他内容中的图片
  end

  def self.down
    drop_table :place_shares
    remove_column :pictures,:type
  end
end
