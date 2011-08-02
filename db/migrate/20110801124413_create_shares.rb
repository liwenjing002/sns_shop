class CreateShares < ActiveRecord::Migration
  def self.up
    create_table :shares do |t|
      t.references :shareable, :polymorphic => true
      t.integer :share_order
      t.integer :share_title
      t.boolean :is_out
      t.string  :out_url
      t.string  :out_img
      t.timestamps
    end
  end

  def self.down
    drop_table :shares
  end
end
