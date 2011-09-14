class AddCityPostition < ActiveRecord::Migration
  def self.up
    add_column :postitions,:home_city,:string
    add_column :postitions,:current_city,:string

  end

  def self.down
    remove_column :postitions,:home_city
    remove_column :postitions,:current_city
  end
end
