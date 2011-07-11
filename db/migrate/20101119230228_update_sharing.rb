class UpdateSharing < ActiveRecord::Migration
  def self.up
    add_column :people, :share_anniversary, :boolean, :default => true
    add_column :people, :share_address, :boolean, :default => true
    add_column :people, :share_home_phone, :boolean, :default => true
    Person.reset_column_information

    change_column_default :people, :share_address,      true
    change_column_default :people, :share_home_phone,   true
    change_column_default :people, :share_anniversary,  true
    change_column_default :people, :share_mobile_phone, false
    change_column_default :people, :share_work_phone,   false
    change_column_default :people, :share_fax,          false
    change_column_default :people, :share_email,        false
    change_column_default :people, :share_birthday,     true
    change_column_default :people, :share_activity,     true

  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
