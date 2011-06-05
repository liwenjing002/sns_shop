class Place < ActiveRecord::Base
  acts_as_taggable
  has_many :albums
  has_many :stream_items, :dependent => :destroy
  has_many :attachments, :dependent => :delete_all
  has_many :admins, :through => :memberships, :source => :person, :order => 'last_name, first_name', :conditions => ['memberships.admin = ?', true]
  
  
  belongs_to :picture
  belongs_to :marker

  
    def shared_stream_items()
    items = stream_items.all(
      :order => 'stream_items.created_at desc',
      :include => :person
    )
    # do our own eager loading here...
    comment_people_ids = items.map { |s| s.context['comments'].to_a.map { |c| c['person_id'] } }.flatten
    comment_people = Person.all(
      :conditions => ["id in (?)", comment_people_ids],
      :select => 'first_name, last_name, suffix, gender, id, family_id, updated_at, photo_file_name, photo_fingerprint' # only what's needed
    ).inject({}) { |h, p| h[p.id] = p; h } # as a hash with id as the key
    items.each do |stream_item|
      stream_item.context['comments'].to_a.each do |comment|
        comment['person'] = comment_people[comment['person_id']]
      end
      stream_item.readonly!
    end
    items
  end
  
    
    def can_send?(person)
#    (members_send and person.member_of?(self) and person.messages_enabled?) or admin?(person)
  end
  alias_method 'can_post?', 'can_send?'

     def can_share?(person)
    person.member_of?(self) and \
      (
        (email? and can_post?(person)) or \
        blog? or \
        pictures? or \
        prayer?
      )
  end
end
