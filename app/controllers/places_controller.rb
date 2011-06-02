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
    @stream_items = @place.shared_stream_items

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
	  @marker = Marker.new
    @marker.marker_latitude = @place.place_latitude
    @marker.marker_longitude = @place.place_longitude
    @marker.geocode_position = @place.full_address
    @marker.object_type = "Place"
    @marker.map_id =  Map.find_by_people_id(@logged_in.id).id
    if @place.save
      @marker.object_id = @place.id
      @marker.save
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
  
  
end
