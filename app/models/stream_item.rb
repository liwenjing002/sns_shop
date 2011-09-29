class StreamItem < ActiveRecord::Base
  belongs_to :person
  belongs_to :wall, :class_name => 'Person'
  belongs_to :site
  belongs_to :group
  belongs_to :place
  belongs_to :streamable, :polymorphic => true

  serialize :context

  scope_by_site_id

  before_save :ensure_context_is_hash

  def ensure_context_is_hash
    self.context = {} if not context.is_a?(Hash)
  end

  after_save :expire_caches
  after_destroy :expire_caches

  # can't do this in a sweeper since there isn't a controller involved
  def expire_caches
    if %w(NewsItem Publication).include?(streamable_type)
      ActionController::Base.cache_store.delete_matched(%r{stream\?for=\d+&fragment=stream_items})
    elsif person
      ids = [person_id] + person.all_friend_and_groupy_ids
      ActionController::Base.cache_store.delete_matched(%r{stream\?for=(#{ids.join('|')})&fragment=stream_items})
    end
    if group_id
      ActionController::Base.cache_store.delete_matched(%r{groups/#{group_id}\?fragment=stream_items})
    end
  end

  def can_have_comments?
    %w(Verse Note Album PlaceShare Place Activity).include?(streamable_type)
  end
  
  def streamable_obj

    arr = streamable_type.split(/_/)
    
    eval(arr.length>1?arr[1]:arr[0]).find(streamable_id)
  end
  
      def is_marker
    return  Marker.find_by_object_type_and_object_id("StreamItem",id)!=nil ? true:false
  end
end
