class Activity < ActiveRecord::Base
  belongs_to :creater, :class_name => 'Person', :foreign_key => 'create_id'
  has_many :comments, :dependent => :destroy
  after_create :create_people_activity,:create_as_stream_item
  has_many :people_activity
  has_many :in_person,:through => :people_activity
  has_many :apply_person,:through => :people_activity
  
  def create_people_activity
    PeopleActivity.create({:activity_id=>id,:person_id=>create_id,:status=>"a"})
  end
  
  def create_as_stream_item
     StreamItem.create!(
      :title           => name,
      :person_id       => create_id,
      :streamable_type => 'Activity',
      :streamable_id   => id,
      :created_at      => created_at,
      :shared          => true 
    )
  end
end
