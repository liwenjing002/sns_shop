class Location::PlacesController < ApplicationController
  respond_to :html,:js
  def index
    @places = Place.all
  end

  # GET /places/1
  # GET /places/1.xml
  def show
    @place = Place.find(params[:id])
    @mm = MarkerToMap.find_by_marker_id_and_map_id(@place.marker_id,@logged_in.map.id)
    @albums = @place.albums
    @pictures = @albums[0].pictures.paginate(:order => 'id',:page=>1) if @albums.length >0
    @impressions = Impression.find_all_by_i_type 'Place'
    @p_impression = PersonImpression.find_by_person_id_and_object_type_and_object_id(@logged_in.id,'Place',params[:id])
    @follow_peoples = MarkerToMap.find_all_by_marker_id @place.marker_id
#    unless  fragment_exist?(:controller => 'places', :action => 'show', :fragment => 'place_share_items')
      @stream_items = @place.shared_stream_items
#    end
    
  end

  # GET /places/new
  # GET /places/new.xml
  def new
    @place = Place.new
  end

  # GET /places/1/edit
  def edit
    @place = Place.find(params[:id])
  end

  def create
    
    @place = Place.new(params[:place])
    @place.picture = Picture.find(params[:picture][:id]) if params[:picture][:id] and params[:picture][:id]!=""
    
    if @place.save
      @marker = Marker.new
      @marker.marker_latitude = @place.place_latitude
      @marker.marker_longitude = @place.place_longitude
      @marker.geocode_position = @place.full_address
      @marker.object_type = "Place"
      @marker.owner = @logged_in
      @marker.object_id = @place.id
      MarkerToMap.create({:map=>@logged_in.map,:marker=>@marker})
      @marker.save
      @place.marker = @marker
      @place.save
    else
      @error_string = ''
      @place.errors.full_messages.each { |error|
        @error_string += (error+ " ")
      }
     
    end
  end	


  def update
    @place = Place.find(params[:id])
    @place.update_attributes(params[:place])
  end

  # DELETE /places/1
  # DELETE /places/1.xml
  def destroy
    @place = Place.find(params[:id])
    @place.destroy
  end
  
  def add_share
    @album =  Album.find_or_create_by_name(
      if params[:album].to_s.any? and params[:album] != t('share.default_album_name')
        params[:album]
      else
        @logged_in.name
      end
    ) { |a| a.person = @logged_in }
    @album.place_id = params[:place_id] 
    @album.save
    pic  = nil
    pic = Picture.find(params[:picture][:id]) if params[:picture][:id] and params[:picture][:id]!= ""

    @place_message = PlaceShare.create(
      :person=>@logged_in,
      :picture=>pic,
      :text=>params[:place_share][:text],
      :is_public=>true,
      :album=>@album)
    @stream_item = @place_message.stream_item
    @album.place.picture = pic if !@album.place.picture
    @album.place.save
    flash[:warning] = "添加地点分享成功"
    expire_fragment(:controller => 'places', :action => 'show', :fragment => 'place_share_items',:id=>params[:place_id] )
  end
  
  
  def add_temp_pic
    @album =  Album.find_or_create_by_name(
      if params[:album].to_s.any? and params[:album] != t('share.default_album_name')
        params[:album]
      else
        @logged_in.name
      end
    ) { |a| a.person = @logged_in }
    if params[:plave_id]
      @album.place_id = params[:place_id] 
      @album.save
    end
     
    pic = @album.pictures.create(
      :person => (@logged_in),
      :photo  => params[:picture],
      :type=>"mix"
    )
    
    #    render :json=>{:success=>true}
    render :text => "{success:'" + "true" + "', pic_id:'" + pic.id.to_s + "',pic_url:'" + pic.photo.url(:profile) + "'}";
  end
  
  

  
  def tags_change
    tags = params[:place][:tags].gsub(/，/, ',')
    @place = Place.find(params[:place_id])
    @place.tag_list.add(tags, :parse => true)
    @place.save
    @mm_new = MarkerToMap.find_or_create_by_marker_id_and_map_id(Place.find(params[:place_id]).marker.id,@logged_in.map.id)
    @mm_new.tag_list = tags
    @mm_new.save
    @mm_new = MarkerToMap.find_by_marker_id_and_map_id(Place.find(params[:place_id]).marker.id,@logged_in.map.id)
    @logged_in.tag_list.add(tags, :parse => true)
    @logged_in.save
  end
  
  
  def owner_manager
    if params[:marker_id]
      if params[:owner] =="false"
        marker = Marker.find_by_owner_id_and_id(@logged_in.id,params[:marker_id])
        if marker
          marker.owner_id = nil
          marker.save
          render :json => {:owner =>false,:success=>true}
        end
      else
        marker = Marker.find(params[:marker_id])
        if marker
          marker.owner_id = @logged_in.id
          marker.save
          render :json => {:owner =>true,:success=>true}
        end 
      end
      return
    end
     render :json => {:success=>false}
  end
  
  #place 的印象
  def add_impression
    @p_impression = PersonImpression.find_or_create_by_person_id_and_impression_id_and_object_type_and_object_id(
      @logged_in.id,params[:id],'Place',params[:place_id])
    @p_impression ? (render :json => {:success=>true}):(render :json => {:success=>false}) 
    
  end
  
  def search_ajax
    @places = Place.find(:all,:conditions =>["place_name like ?","%#{params[:p]}%"],:select=>"place_name",:limit=>params[:limit]||10)
    p_name = []
    @places.each do |place|
    p_name << place.place_name
    end
    
    render :json=>{:data=>p_name}
  end
  
  
  def search
    
  end
  

end
