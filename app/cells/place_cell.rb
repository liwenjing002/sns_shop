
class PlaceCell < Cell::Rails

helper  ApplicationHelper
helper  PlacesHelper
helper StreamsHelper
  def impression
    @impressions = @opts[:impressions]
    @place = @opts[:place]
    render
  end

  def people
    @place = @opts[:place]
    @follow_peoples = @opts[:follow_peoples]
    render
  end

  def photo
    @place = @opts[:place]
    render
  end

  def place_description
    @place = @opts[:place]
    render
  end

  def place_message
    @place = @opts[:place]
    @stream_items = @opts[:stream_items]
    render
  end

  def place_share_item
    @place = @opts[:place]
    @stream_item = @opts[:stream_item]
    @is_hide = @opts[:is_hide]
    render
  end

  def place_share_items
    @place = @opts[:place]
    @stream_items = @opts[:stream_items]
    render
  end

  def share_bar
    @place = @opts[:place]
    @mm = @opts[:mm]
    @logged_in = @opts[:logged_in]
    render
  end
  
  def search
    render
  end
  
  def place_index
    render
  end

end
