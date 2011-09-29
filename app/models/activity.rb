class Activity < ActiveRecord::Base
  belongs_to :creater, :class_name => 'Person', :foreign_key => 'create_id'
end
