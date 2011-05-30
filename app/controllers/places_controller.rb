class PlacesController < ApplicationController
  respond_to :html,:js
  def index
    @places = Place.all
  end

  # GET /places/1
  # GET /places/1.xml
  def show
    @place = Place.find(params[:id])
<<<<<<< HEAD

#    @stream_items = @place.shared_stream_items(20)
#    @can_post = @place.can_post?(@logged_in)
#    @can_share = @place.can_share?(@logged_in)
#    @albums = @place.albums.all(:order => 'name')

=======
	@album = @place.albums
    @pictures = @album.pictures.paginate(:order => 'id') if @album.length >0 
#    unless @logged_in.can_see?(@place)
#      render :text => t('groups.not_found'), :layout => true, :status => 404
#      return
#    end
>>>>>>> 18a9d8ef76150f72033b1dcf36c7c5c7b4da10fe
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
	  @marker = Marker.new(params[:marker])
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
