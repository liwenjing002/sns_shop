#为地点主页上的用户留言信息，包括 旅游建议和旅游提问，正文包括，文字和图片，图片只能是一张
class PlaceShare < ActiveRecord::Base
  belongs_to :person
  belongs_to :stream_item
   belongs_to :place
  belongs_to :picture
  attr_accessor:album
    has_many :comments, :dependent => :destroy



  after_create :create_as_stream_item

  def create_as_stream_item
      context = {'picture_ids' => [[self.picture.id, self.picture.photo.fingerprint, self.picture.photo_extension]]} if self.picture
      
     item =  StreamItem.create!(
        :title           => album.name,
        :body            => text,
        :context         => context,
        :person_id       => person_id,
        :place_id        => album.place_id,
        :streamable_type => 'PlaceShare',
        :streamable_id   => id,
        :created_at      => created_at,
        :shared          => album.place_id || person.share_activity? ? true : false
      )
      self.stream_item_id = item.id
      self.save
  end

#  after_update :update_stream_items

  def update_stream_items
    return unless self.type != 'mix' 
    StreamItem.find_all_by_streamable_type_and_streamable_id('Album', album_id).each do |stream_item|
      stream_item.context['picture_ids'].each do |pic|
        if pic[0] == id
          pic[1] = photo.fingerprint
          pic[2] = photo_extension
        end
      end
      stream_item.save!
    end
  end

  after_destroy :delete_stream_items

  def delete_stream_items
    StreamItem.find_all_by_streamable_type_and_streamable_id('Album', album_id).each do |stream_item|
      stream_item.context['picture_ids'].reject! { |pic| pic == self.id or pic.first == self.id }
      if stream_item.context['picture_ids'].any?
        stream_item.save!
      else
        stream_item.destroy
      end
    end
  end
end
