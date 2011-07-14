
class PlaceCell < Cell::Rails

helper  ApplicationHelper
helper  PlacesHelper
helper StreamsHelper
  def impression
    @impressions = options[:impressions]
    @place = options[:place]
    render
  end

  def people
    @place = options[:place]
    @follow_peoples = options[:follow_peoples]
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

end
