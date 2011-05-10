class CreatePrivacies < ActiveRecord::Migration
  def self.up
    create_table :privacies do |t|
	  t.boolean :share_all_basic
      t.boolean :share_all_address
      t.boolean :share_all_about
      t.boolean :share_all_company
      t.boolean :share_all_activity
	  t.boolean :share_all_ablums
      t.boolean :share_all_visible
      t.boolean :share_friend_basic
      t.boolean :share_friend_address
      t.boolean :share_friend_about
	  t.boolean :share_friend_company
	  t.boolean :share_friend_activity
	  t.boolean :share_friend_ablums
	  t.boolean :share_friend_visible
      t.timestamps
    end
 	add_column :people,:privacy_id,:integer
    add_index "people", ["privacy_id"], :name => "index_privacy_id_on_people"
  end

  def self.down
    drop_table :privacies
	remove_colum :people,:privacy_id
  end
end
