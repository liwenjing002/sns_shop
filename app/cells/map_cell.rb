class MapCell < Cell::Rails
helper  ApplicationHelper



  def map
    @map = options[:map]
    @person = options[:person]
    @logged_in = options[:logged_in]
    render
  end

end
