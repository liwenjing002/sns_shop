class PeopleActivity < ActiveRecord::Base
 belongs_to :in_person,:class_name => "Person", :foreign_key => "person_id",:conditions=>"status = 'a'"
 belongs_to :apply_person,:class_name => "Person", :foreign_key => "person_id",:conditions=>"status = 'w'"
 belongs_to :person
 belongs_to :activity
end
