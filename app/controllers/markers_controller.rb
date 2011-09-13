class MarkersController < ApplicationController
  respond_to :html,:js
  def index
    @my_home = @logged_in.postition
    @ta_home = Person.find(params[:people_id]).postition if  params[:people_id]
    user =  params[:people_id]? Person.find(params[:people_id]):@logged_in
    case params[:type]
    when "own"
      map = user.map
      @markers = Marker.find_my_marker map.id
    when "follow"
      map = user.map
      @markers = map.markers
    when "rander"
      @markers = Marker.find(:all,:conditions=>['object_type=?','Place'], :order => "RAND()", :limit =>3 )
    when 'friend_position'
     render :json =>  @friends = user.friends.to_json
    when 'schedule'
      @plans = user.plans
    when 'location'
       @markers = Marker.find_my_location 
    when 'locus'
      @markers = Marker.find_my_locus Time.new
      
    end
    
    #render :json => Marker.find_all_by_map_id(map_id).to_json
    #@markers = Marker.owner_friendships_person_id_is(@logged_in.id)
  end

  def update
    if params[:marker][:id]
      @marker = Marker.find(params[:marker][:id])
      if @marker.update_attributes(params[:marker])
        if @marker.object_type == 'StreamItem'
          @stream_item = @marker.object
          @stream_item.streamable.body += "<div id='location_now'><span color: #5F9128>当前位置：</span>#{@marker.geocode_position}</div>".html_safe
          @stream_item.save
#          html = "#{@marker.marker_html}<div id='location_now'><span color: #5F9128>当前位置：</span>#{@marker.geocode_position}</div>".html_safe
#          html = html.gsub(/\'/, '"')
#          html = html.gsub(/[\n\r]/,'')
#          @marker.marker_html = html.html_safe
#          @marker.save
          render :json => {:success=>false} 
        else
            render :json => {:success=>false} 
        end
      else
        render :json => {:success=>false} 
      end
  else
     render :json => {:success=>false} 
  end
  end

  def destroy
    if params[:id]
      marker = Marker.find(params[:id])
      if marker.destroy
        render :json => {:success=>true} 
      else
        render :json => {:success=>false} 
      end
	 
    end
  end

  #添加或取消marker的关注
  def follow
    mm = nil
    if params[:do]=='add'
      mm =  MarkerToMap.find_or_create_by_marker_id_and_map_id_and_marker_type(params[:marker_id],@logged_in.map.id,params[:marker_type])
      render :json => {:success=>true}
      return
    end
    if params[:do] =='cancer'
      mm =MarkerToMap.find_by_marker_id_and_map_id_and_marker_type(params[:marker_id],@logged_in.map.id,params[:marker_type])
      if mm
        mm.destroy
        render :json => {:success=>true}
        return
      else
        render :json => {:success=>false}
        return
      end
    end
    render :json => {:success=>false}
  end


  def search
    res =[]
    peoples = Person.find(:all,:conditions=>["first_name like ?", "%#{params[:key]}%"])
    places = Place.find(:all,:conditions=>["place_name like ? or place_description like ?", "%#{params[:key]}%","%#{params[:key]}%"])
    
    peoples.each { |people|
    
      res << {:html=>"#{people.name}:Ta家在：#{people.postition.home_address}",:lat=>people.postition.home_latitude,:lng=>people.postition.home_longitude}
    }
    places.each{|place|
      res << {:html=>place.marker.marker_html,:lat=>place.marker.marker_latitude,:lng=>place.marker.marker_longitude}
    
    }
    render :json => res
  end
  def test
  end
  
  def locus
    if params[:marker_id]
    marker = Marker.find(params[:marker_id])
    @markers = Marker.find(:all,:conditions=["DATE_FORMAT(created_at,'%y%m%d') = ? and object_type != 'Place'",marker.created_at.strftime("%y%m%d")])
    @markers
    end
    if params[:marker][:day]
    @day = params[:marker][:day]
    end
  end
  
  #上一个marker 和下一个marker,地理位置的状态
  def marker_l_n
    @marker = Marker.marker_last_next(params[:id], params[:key])
  end
  
  
  #一天轨迹的主页，参考 note show 页面修改
  #根据某一个streamable 判断出当天的一条轨迹 
  # 目前先实现note 轨迹。图片先不考虑
  def locus_index
    streamitem = StreamItem.find(params[:id])
    if streamitem
     @markers =  Marker.find_my_locus streamitem.created_at.strftime("%Y/%m/%d")
     @person = streamitem.person
    end
  end
  
  
end
