class PlacesController < ApplicationController
  respond_to :html,:js
  def index
    @places = Place.all
  end

  # GET /places/1
  # GET /places/1.xml
  def show
  @place = Place.find(params[:id])
	@album = @place.albums
  @pictures = @album.pictures.paginate(:order => 'id') if @album.length >0 
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

    pic = @album.pictures.create(
        :person => (@logged_in),
        :photo  => params[:picture],
        :type=>"mix"
      ) if params[:place_share][:picture]
    @place_message = PlaceShare.create(
        :person=>@logged_in,
        :picture=>pic,
        :text=>params[:place_share][:text],
        :album=>@album)
     @stream_item = @place_message.stream_item
     render :template => "streams/create_streams"
  end
  
  
end
