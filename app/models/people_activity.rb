class PeopleActivity < ActiveRecord::Base
 belongs_to :person
 belongs_to :activity
end
