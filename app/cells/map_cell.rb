class MapCell < Cell::Rails
attr_reader :content_for_head 

  def map
    @map = @opts[:map]
    @person = @opts[:person]
    @logged_in = @opts[:logged_in]
    render
  end

end
