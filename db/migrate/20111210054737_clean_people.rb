class CleanPeople < ActiveRecord::Migration
  def self.up
    remove_column :people,:legacy_id
    remove_column :people,:last_name
    remove_column :people,:suffix
    remove_column :people,:mobile_phone
    remove_column :people,:work_phone
    remove_column :people,:fax
    remove_column :people,:classes
    remove_column :people,:shepherd
    remove_column :people,:business_name
    remove_column :people,:business_description
    remove_column :people,:business_phone
    remove_column :people,:business_email
    remove_column :people,:business_website
    remove_column :people,:share_mobile_phone
    remove_column :people,:share_work_phone
    remove_column :people,:share_fax
    remove_column :people,:share_email
    remove_column :people,:share_birthday
    remove_column :people,:share_anniversary
    remove_column :people,:share_home_phone
    remove_column :people,:share_activity
    remove_column :people,:twitter_account
    remove_column :people,:child
    remove_column :people,:can_pick_up
    remove_column :people,:cannot_pick_up

    remove_column :people,:medical_notes
    remove_column :people,:relationships_hash
    remove_column :people,:donortools_id
    remove_column :people,:business_address
    remove_column :people,:staff
    remove_column :people,:elder
    remove_column :people,:deacon
    remove_column :people,:visible_to_everyone
    remove_column :people,:visible_on_printed_directory
    remove_column :people,:full_access
    remove_column :people,:legacy_family_id
    remove_column :people,:feed_code
    remove_column :people,:anniversary
    remove_column :people,:business_category
    remove_column :people,:get_wall_email
#
    add_column :people,:city,:string

  
  end

  def self.down
  end
end
