class MarkersController < ApplicationController
  respond_to :html,:js
  def index
    
    @my_home = @logged_in.postition
    @ta_home = Person.find(params[:people_id]).postition if  params[:people_id]
    user =  params[:people_id]? Person.find(params[:people_id]):@logged_in
    map = user.map
    html = []
    case params[:type]
    when "own"
      markers = Marker.find_my_places user.id
      markers.each do |marker|
        html<<  marker_html(marker)
      end
    when "follow"
      markers = Marker.find_follow_places map.id
      markers.each do |marker|
       html<<  marker_html(marker)
      end
    when "rander"
      @markers = Marker.find(:all,:conditions=>['object_type=?','Place'], :order => "RAND()", :limit =>3 )
    when 'friend_position'
      html = Postition.find_friend_locus(Time.new.strftime("%Y/%m/%d"),@logged_in.id)
    when 'schedule'
      @plans = user.plans
    when 'location'
      @markers = Marker.find_my_location.to_json(:object)
    when 'locus'
      html = Postition.find_my_locus(Time.new.strftime("%Y/%m/%d"),@logged_in.id,true)
  when 'share'
    search = Marker.search(params[:marker],:marker_type=>"StreamItem")
     markers = search.all(:limit=>100)
      markers.each do |marker|
        html<< marker_html(marker)
      end
  end
    render :json =>html.to_json
  end

  def update
    if params[:id]
      @marker = Marker.find(params[:id])
      if @marker.update_attributes(params[:marker])
        render :json => {:success=>false} 
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
  
  
  private
  def marker_html marker
      html = nil
     case marker.object_type
     when "Place"
        html =  {:html=>render_to_string(:partial => 'common/place_info',
            :locals => {:place=>marker.object,:marker=>marker}),
          :longitude=>marker.marker_longitude,
          :latitude=>marker.marker_latitude,
          :marker_id=>marker.id,
          :geocode_position=>marker.geocode_position}
     when "StreamItem"
       html =  {:html=>render_to_string(:partial => 'common/marker_info',:locals => {:marker=> marker}),
          :longitude=>marker.marker_longitude,
          :latitude=>marker.marker_latitude,
          :marker_id=>marker.id,
          :geocode_position=>marker.geocode_position}
     end
     html
    
  end
  
end
