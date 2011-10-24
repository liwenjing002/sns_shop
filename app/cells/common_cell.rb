class CommonCell < Cell::Rails
  helper  ApplicationHelper
  def marker_info
    render
  end

  def menus
    render
  end

  def new_place
    render
  end
  def new_see_all
    render
  end
  
  def new_share
    render
  end

  def place_info
    render
  end

  def share
    render
  end
  
  def new_destination
  render
  end
  
  def i_want_go
    render
  end
  
  def activity
    @logged_in = options[:logged_in]
    render
  end

  def get_friend_group
    @logged_in = options[:logged_in]
     @friends = @logged_in.friends.paginate(:order => 'created_at desc', :page => params[:page])
     @groups = @logged_in.groups.paginate(:order => 'created_at desc', :page => params[:page])
    render
  end

  def friend_list
    @friends = options[:friends]
    render
  end
  
  def comment
    @comment = options[:comment]
    render 
  end
  
  def dream
    render
  end
end
