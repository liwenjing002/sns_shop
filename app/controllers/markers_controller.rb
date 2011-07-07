class MarkersController < ApplicationController
  respond_to :html,:js
  def index
    @my_home = @logged_in.postition
    @ta_home = Person.find(params[:people_id]).postition if  params[:people_id]
    user =  params[:people_id]? Person.find(params[:people_id]):@logged_in
    case params[:type]
    when "own"
      map = user.map
      @markers = Marker.find_all_by_owner_id map.id
    when "follow"
      map = user.map
      @markers = map.markers
    when "rander"
      @markers = Marker.find(:all,:conditions=>['object_type=?','Place'], :order => "RAND()", :limit =>3 )
    when 'firend_postition'
      @friends = user.friends
    when 'schedule'
      @plans = user.plans
      # render :json => @my_home.to_json
    end
    #render :json => Marker.find_all_by_map_id(map_id).to_json
  end

  def update
    if params[:marker][:id]
      @marker = Marker.find(params[:marker][:id])
      if @marker.update_attributes(params[:marker])
        if @marker.object_type == 'Note'
          render(:template => "notes/create") 
        end
      else
        render :json => {:success=>false} 
      end
	 
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
      mm =  MarkerToMap.find_or_create_by_marker_id_and_map_id(params[:marker_id],@logged_in.map.id)
      render :json => {:success=>true}
      return
    end
    if params[:do] =='cancer'
      mm =MarkerToMap.find_by_marker_id_and_map_id(params[:marker_id],@logged_in.map.id)
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
  
  
end
