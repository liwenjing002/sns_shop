class AddPrivate < ActiveRecord::Migration
  def self.up
	remove_column :people,:share_home_phone
	remove_column :people,:share_mobile_phone
	remove_column :people,:share_work_phone
	remove_column :people,:share_birthday
  end

  def self.down
  end
end
