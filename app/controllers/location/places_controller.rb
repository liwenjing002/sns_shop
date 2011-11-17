class Location::PlacesController < ApplicationController
  respond_to :html,:js
  def index
    
   
  end

  # GET /places/1
  # GET /places/1.xml
  def show
    @place = Place.find(params[:id])
    @mm = MarkerToMap.find_by_marker_id_and_map_id(@place.marker_id,@logged_in.map.id)
    @album = @place.album
    @impressions = Impression.find_all_by_i_type 'Place'
    @p_impression = PersonImpression.find_all_by_person_id_and_object_type_and_object_id(@logged_in.id,'Place',params[:id])
    @follow_peoples = MarkerToMap.find_all_by_marker_id @place.marker_id
    @be_here_peoples = PersonImpression.find_all_by_impression_id_and_object_type_and_object_id(4,"Place",params[:id])
    @love_to_peoples = PersonImpression.find_all_by_impression_id_and_object_type_and_object_id(3,"Place",params[:id])
    #    unless  fragment_exist?(:controller => 'places', :action => 'show', :fragment => 'place_share_items')
    @place_shares = @place.place_shares
    render
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
    params[:place][:person_id] = @logged_in.id
    @place = Place.new(params[:place])
    if @place.save
      @marker = Marker.new
      @marker.marker_latitude = @place.place_latitude
      @marker.marker_longitude = @place.place_longitude
      @marker.geocode_position = @place.full_address
      @marker.object_type = "StreamItem"
      @marker.owner = @logged_in
      @marker.object_id = @place.stream_item_id
      MarkerToMap.create({:map=>@logged_in.map,:marker=>@marker,:marker_type=>"StreamItem"})
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
    place = Place.find(params[:place_id])
    @album =  Album.find_or_create_by_name(place.place_name)
    @album.place_id = params[:place_id] 
    @album.save
    pic  = nil
    pic = Picture.find(params[:picture][:id]) if params[:picture][:id] and params[:picture][:id]!= ""

    @place_message = PlaceShare.create(
      :person=>@logged_in,
      :picture=>pic,
      :place_id=>params[:place_id] ,
      :share_type=>params[:type],
      :text=>params[:place_share][:text],
      :is_public=>true,
      :album=>@album)
    @stream_item = @place_message.stream_item
    @album.place.picture = pic if !@album.place.picture
    @album.place.save
    flash[:warning] = "添加地点分享成功"
#    expire_fragment(:controller => 'places', :action => 'show', :fragment => 'place_share_items',:id=>params[:place_id] )
  end
  
  
  def add_temp_pic
    if params[:place_id]
      place = Place.find(params[:place_id])
      @album =  Album.find_or_create_by_name( place.place_name)
      @album.place_id = params[:place_id]
      @album.save
      pic = @album.pictures.create( :person => (@logged_in), :photo  => params[:picture],:type=>"mix"  )
    else
      @album =  Album.find_or_create_by_name("temp_pci")
      pic = @album.pictures.create( :person => (@logged_in), :photo  => params[:picture])
    end
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
    
    if params[:id] =="1" or  params[:id] =="3" 
      d_impression = PersonImpression.find_by_person_id_and_impression_id_and_object_type_and_object_id(
        @logged_in.id,params[:id].to_i+1,'Place',params[:place_id])
      d_impression.destroy if d_impression
    end
    if params[:id] =="2" or params[:id] =="4" 
      d_impression = PersonImpression.find_by_person_id_and_impression_id_and_object_type_and_object_id(
        @logged_in.id,params[:id].to_i-1,'Place',params[:place_id])
      d_impression.destroy if d_impression
    end
    @p_impression ? (render :json => {:success=>true}):(render :json => {:success=>false}) 
    
  end
  
  def search_ajax
    @places = Place.find(:all,:conditions =>["place_name like ?","%#{params[:key]}%"],:select=>"place_name",:limit=>params[:limit]||10)
    p_name = []
    @places.each do |place|
      p_name << place.place_name
    end
    
    render :json=>{:data=>p_name}
  end
  
  
  def search
    if  params[:place_key]
      conditions = []
      conditions.add_condition ['place_name like ?', '%' + params[:place_key] + '%']
      @places = Place.find(:all, :conditions => conditions, :order => 'place_name')
    end
    if params[:tag] 
      conditions = []
      conditions.add_condition ['tag_id = ?', params[:tag]]
      conditions.add_condition ['taggable_type = ?', 'Place']
      @places = Place.find(:all,:joins=>["INNER JOIN taggings on taggings.taggable_id = places.id"], :conditions => conditions, :order => 'place_name')
    end
    
  end
  

end
