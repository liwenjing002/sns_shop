class TagToTag < ActiveRecord::Base
  
  has_many :tag_to,:foreign_key=>"tag_id",:primary_key=>"tag_to_id",:class_name => "Tagging"
end
