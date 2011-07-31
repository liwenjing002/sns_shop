
class PlaceCell < Cell::Rails

  helper  ApplicationHelper
  helper  PlacesHelper
  helper StreamsHelper
  def impression
    @impressions = options[:impressions]
    @p_impression = options[:p_impression]
    @place = options[:place]

    render
  end

  def people
    @place = options[:place]
    @follow_peoples = options[:follow_peoples]
    @love_to_peoples = options[:love_to_peoples]
    @be_here_peoples = options[:be_here_peoples]
    render
  end

  def photo
    @place = options[:place]
    render
  end

  def place_description
    @place = options[:place]
    render
  end

  def place_message

    @place = options[:place]
    @stream_items = options[:stream_items]
    render
  end

  def place_share_item
    @place = options[:place]
    @stream_item = options[:stream_item]
    @is_hide = options[:is_hide]
    render
  end

  def place_share_items

    @place = options[:place]
    @stream_items = options[:stream_items]

    render
  end

  def share_bar

    @place = options[:place]
    @mm = options[:mm]
    @logged_in = options[:logged_in]

    render
  end
  
  def search
    render
  end
  
  def place_index
    render
  end
  
  def select_place
    @places= options[:places]
     render
  end
  
  def search_by_tag
    @tags = Tagging.find_all_by_taggable_type 'Place'
    render
  end
  
  def hot
    @place =Place.find(1)
    render
  end

end
