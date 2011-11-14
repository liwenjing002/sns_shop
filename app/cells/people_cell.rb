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
  
    def group
    @flash = parent_controller.flash
    @logged_in = options[:logged_in]
    @person= options[:person]
    render
  end
  
   def place
    @flash = parent_controller.flash
    @logged_in = options[:logged_in]
    @person= options[:person]
    @places = @person.places
    render
  end
  
   def show_php
     @stream_items = options[:stream_items]
     @logged_in = options[:logged_in]
    @person= options[:person]
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
  
  def locus
    @person= options[:person]
    @logged_in = options[:logged_in]
    time = options[:day] 
    @postitions = Postition.find_my_locus(time,@logged_in.id,false)

    render
  end
  
    def thumbnail_wall
    @peoples = Person.find(:all,:limit=>35)
    render 
  end


end
