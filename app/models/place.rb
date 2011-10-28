class Place < ActiveRecord::Base
  acts_as_taggable
  has_one :album
  has_many :place_shares, :dependent => :destroy
  has_many :attachments, :dependent => :delete_all
  has_many :admins, :through => :memberships, :source => :person, :order => 'last_name, first_name', :conditions => ['memberships.admin = ?', true]
  belongs_to :stream_item
  belongs_to :picture 
  belongs_to :marker


  validates_presence_of :place_name,:message => '地点名称不为空'
  validates_uniqueness_of :place_name,:message => "该名称已经被使用"
  
  after_create :create_as_stream_item

  def create_as_stream_item
    context = {'picture_ids' => [[self.picture.id, self.picture.photo.fingerprint, self.picture.photo_extension]]} if self.picture

    item =  StreamItem.create!(
      :title           => place_name,
      :person_id       => person_id,
      :streamable_id        => id,
      :streamable_type => 'Place',
      :created_at      => created_at,
      :shared          =>  true
    )
  end
        def shared_stream_items
    items = self.stream_items.all(
      :order => 'stream_items.created_at desc',
      :include => :person
    )
        end

  
   
  #获取前几位热门的place，热门度目前采用关注人数
  def get_hoteset_place num
     
     
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
