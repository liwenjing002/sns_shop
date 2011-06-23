class Address < ActiveRecord::Base
  belongs_to :father,:class_name => "Address"
  has_many :children,:class_name => "Address", :foreign_key => "father_id"


  #根据位置关键字模糊搜索
  def search_address(key)
   
    
  end
end
