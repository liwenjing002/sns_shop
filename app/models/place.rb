class Place < ActiveRecord::Base
  acts_as_taggable
  has_one :album
    has_many :place_shares, :dependent => :destroy
  has_many :stream_items, :dependent => :destroy , :through => :place_shares
  has_many :attachments, :dependent => :delete_all
  has_many :admins, :through => :memberships, :source => :person, :order => 'last_name, first_name', :conditions => ['memberships.admin = ?', true]
  belongs_to :stream_item
  belongs_to :picture 
  belongs_to :marker
  belongs_to :person


  validates_presence_of :place_name,:message => '地点名称不为空'
  validates_uniqueness_of :place_name,:message => "该名称已经被使用"
  
  after_create :create_as_stream_item

    def validate
     places =  Place.find(:all,:conditions=>["place_latitude = ? and place_longitude = ?",place_latitude,place_longitude])
     if (self.id ==nil and places.length >0) or
        (self.id !=nil and  places.length > 1) or
        (self.id !=nil and  places.length == 1 and self.id != places[0].id)
      self.errors.add(:place_latitude, "已存在相同坐标的地点")
     end
 
  end
  
  
  def create_as_stream_item
    item =  StreamItem.create!(
      :title           => place_name,
      :person_id       => person_id,
      :streamable_id        => id,
      :streamable_type => 'Place',
      :created_at      => created_at,
      :shared          =>  true
    )
    self.stream_item_id = item.id
    self.save
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
