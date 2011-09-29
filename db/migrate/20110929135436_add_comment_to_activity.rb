class AddCommentToActivity < ActiveRecord::Migration
  def self.up
    add_column :comments,:activity_id,:integer
  end

  def self.down
  remove_column :comments,:activity_id
  end
end
