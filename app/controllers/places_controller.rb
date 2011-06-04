class PlacesController < ApplicationController
  respond_to :html,:js
  def index
    @places = Place.all
  end

  # GET /places/1
  # GET /places/1.xml
  def show
    @place = Place.find(params[:id])
    @albums = @place.albums
    @pictures = @albums[0].pictures.paginate(:order => 'id',:page=>1) if @albums.length >0 
    unless  fragment_exist?(:controller => 'places', :action => 'show', :fragment => 'place_share_items')
      @stream_items = @place.shared_stream_items
    end
    
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
      render :json => {:success=>false}
    end
  end	

  # PUT /places/1
  # PUT /places/1.xml
  def update
    @place = Place.find(params[:id])
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
      :album=>@album)
    @stream_item = @place_message.stream_item
    expire_fragment(:controller => 'places', :action => 'show', :fragment => 'place_share_items',:id=>params[:place_id] )
    render :template => "places/create_streams"
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
  
  
  def follow_place
    if params[:marker_id]
    if params[:follow] =="true"
      MarkerToMap.find_or_create_by_marker_id_and_map_id(params[:marker_id],@logged_in.map.id)
      render :json => {:follow=>true,:success=>true}
      else
      mm  = MarkerToMap.find_by_marker_id_and_map_id(params[:marker_id],@logged_in.map.id)
      mm.destroy if mm
      render :json => {:follow=>false,:success=>true}
      end 
    else
      render :json => {:success=>false}
    end
  end
  
  def add_or_modify_tag
    
  end
  
end
