class AddPrivate < ActiveRecord::Migration
  def self.up
    remove_column :people,:share_home_phone
    remove_column :people,:share_mobile_phone
    remove_column :people,:share_work_phone
    remove_column :people,:share_birthday
    
    
    add_column :people,:share_all_basic,:boolean
    add_column :people,:share_all_address,:boolean
    add_column :people,:share_all_about,:boolean
    add_column :people,:share_all_company,:boolean
    add_column :people,:share_all_activity,:boolean
    add_column :people,:share_all_visible,:boolean
     
    add_column :people,:share_friend_basic,:boolean
    add_column :people,:share_friend_address,:boolean
    add_column :people,:share_friend_about,:boolean
    add_column :people,:share_friend_company,:boolean
    add_column :people,:share_friend_activity,:boolean
    add_column :people,:share_friend_visible,:boolean
    
    add_column :memberships,:share_basic,:boolean
    add_column :memberships,:share_about,:boolean
    add_column :memberships,:share_company,:boolean
    add_column :memberships,:share_activity,:boolean
    add_column :memberships,:share_visible,:boolean
    
    remove_column :memberships,:share_mobile_phone
    remove_column :memberships,:share_work_phone
    remove_column :memberships,:share_fax
    remove_column :memberships,:share_email
    remove_column :memberships,:share_birthday
    remove_column :memberships,:share_home_phone
    remove_column :memberships,:anniversary
    
    
   
    
  
  end

  def self.down
    add_column :people,:share_home_phone,:boolean
    add_column :people,:share_mobile_phone,:boolean
    add_column :people,:share_work_phone,:boolean
    add_column :people,:share_birthday,:boolean
    
    remove_column :people,:share_all_basic
    remove_column :people,:share_all_address
    remove_column :people,:share_all_about
    remove_column :people,:share_all_company
    
    remove_column :people,:share_friend_basic
    remove_column :people,:share_friend_address
    remove_column :people,:share_friend_about
    remove_column :people,:share_friend_company
    
    remove_column :people,:share_all_activity
    remove_column :people,:share_friend_activity
    remove_column :people,:share_visible
    remove_column :people,:share_friend_visible
    remove_column :people,:share_all_visible
    
    remove_column :memberships,:share_basic
    remove_column :memberships,:share_about
    remove_column :memberships,:share_company
    remove_column :memberships,:share_activity
    remove_column :memberships,:share_visible
    
    
    add_column :memberships,:share_mobile_phone,:boolean
    add_column :memberships,:share_work_phone,:boolean
    add_column :memberships,:share_home_phone,:boolean
    add_column :memberships,:share_fax,:boolean
    add_column :memberships,:share_email,:boolean
    add_column :memberships,:share_birthday,:boolean
    add_column :memberships,:anniversary,:boolean
  end
end
