class MapCell < Cell::Rails
helper  ApplicationHelper



  def map
    @map = options[:map]
    @person = options[:person]
    @logged_in = options[:logged_in]
    render
  end
  
  def map_window
    
    @logged_in = options[:logged_in]
    @map = @logged_in.map
    render
  end
  
  def map_sign_in
    render
  end

end
