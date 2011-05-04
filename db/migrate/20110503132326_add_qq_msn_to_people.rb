class AddQqMsnToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :qq, :string
    add_column :people, :msn, :string
    add_column :people, :weibo, :string
    add_column :people, :twitter,:string
  end

  def self.down
    remove_column :people, :qq
    remove_column :people, :msn
    remove_column :people, :weibo
    remove_column :people, :twitter
  end
end
