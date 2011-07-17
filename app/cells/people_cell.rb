class PeopleCell < Cell::Rails
  helper_method :parent_controller
  helper  ApplicationHelper
  helper  PeopleHelper
  def thumbnail

    @person = options[:person]
    render
  end
  
  def php
    @person= options[:person]
    render
  end
  
  def profile
    @flash = parent_controller.flash
    @logged_in = options[:logged_in]
    @person= options[:person]
    @verses =options[:verses]
    render
  end
  
  
  def pending_updates
    @person= options[:person]
    @logged_in = options[:logged_in]
     render
  end
  
  def friendship
    @person= options[:person]
    @logged_in = options[:logged_in]
     render
  end


end
