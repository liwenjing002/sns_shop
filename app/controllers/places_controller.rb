class PlacesController < ApplicationController
  	respond_to :js
  def index
    @places = Place.all
  end

  # GET /places/1
  # GET /places/1.xml
  def show
    @place = Place.find(params[:id])

    @stream_items = @place.shared_stream_items(20)
    @can_post = @place.can_post?(@logged_in)
    @can_share = @place.can_share?(@logged_in)
    @albums = @place.albums.all(:order => 'name')

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
	  @marker.geocode_position = @place.full_address
	  @marker.marker_latitude = @place.place_latitude
	  @marker.marker_longitude = @place.place_longitude
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
end
