module ActivitiesHelper
  def is_in_activity person
    PeopleActivity.find(:all,:conditions=>["person_id=? ",person.id]).count == 0
  end
end
