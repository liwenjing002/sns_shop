class MapCell < Cell::Rails
helper  ApplicationHelper



  def map
    @map = @opts[:map]
    @person = @opts[:person]
    @logged_in = @opts[:logged_in]
    render
  end

end
