class PlacesController < ApplicationController
  	respond_to :js
  def index
    @places = Place.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @places }
    end
  end

  # GET /places/1
  # GET /places/1.xml
  def show
    @place = Place.find(params[:id])
	@album = @place.albums
    @pictures = @album.pictures.paginate(:order => 'id') if @album.length >0 
#    unless @logged_in.can_see?(@place)
#      render :text => t('groups.not_found'), :layout => true, :status => 404
#      return
#    end
  end

  # GET /places/new
  # GET /places/new.xml
  def new
    @place = Place.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @place }
    end
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
	  end	
    end
  end

  # PUT /places/1
  # PUT /places/1.xml
  def update
    @place = Place.find(params[:id])

    respond_to do |format|
      if @place.update_attributes(params[:place])
        format.html { redirect_to(@place, :notice => 'Place was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @place.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /places/1
  # DELETE /places/1.xml
  def destroy
    @place = Place.find(params[:id])
    @place.destroy

    respond_to do |format|
      format.html { redirect_to(places_url) }
      format.xml  { head :ok }
    end
  end
