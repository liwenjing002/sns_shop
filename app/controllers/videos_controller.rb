class VideosController < ApplicationController
  # GET /videos
  # GET /videos.xml
  def index
    @videos = Video.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @videos }
    end
  end

  # GET /videos/1
  # GET /videos/1.xml
  def show
    @video = Video.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @video }
    end
  end

  # GET /videos/new
  # GET /videos/new.xml
  def new
    @video = Video.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @video }
    end
  end

  # GET /videos/1/edit
  def edit
    @video = Video.find(params[:id])
  end

  # POST /videos
  # POST /videos.xml
  def create
    params[:video][:person_id] = @logged_in.id
    params[:marker][:owner_id] =  @logged_in.id
    if  params[:is_location] = "0" and (params[:marker][:geocode_position]!= '' and
          params[:marker][:geocode_position]!= '地球某地')  or (        params[:marker][:marker_longitude]!= '' and
          params[:marker][:marker_latitude]!= '')

      is_location = true
    else
      is_location = false
    end

    params[:video][:location] = params[:marker][:geocode_position] if is_location
    params[:video][:longitude] = params[:marker][:marker_longitude] if is_location
    params[:video][:latitude] = params[:marker][:marker_latitude] if is_location
    @video = Video.new(params[:video])
    if @video.save
      unless is_location
        params[:marker][:marker_longitude] = BigDecimal.new(params[:marker][:marker_longitude])
        params[:marker][:marker_latitude] = BigDecimal.new(params[:marker][:marker_latitude])
        @marker = Marker.new(params[:marker])

        MarkerToMap.create({:map=>@logged_in.map,:marker=>@marker,:marker_type=>'StreamItem'})
        @marker.object_type = "StreamItem"
        @marker.object_id = @video.stream_item_id
        @marker.save
      end
     @notice = "发布视频成功"
    else
      error_msg = ''
      @video.errors.full_messages.each do |msg|
       error_msg +=(msg+"|")
      end
      @notice =error_msg
    end

  end

  # PUT /videos/1
  # PUT /videos/1.xml
  def update
    @video = Video.find(params[:id])

    respond_to do |format|
      if @video.update_attributes(params[:video])
        format.html { redirect_to(@video, :notice => 'Video was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @video.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /videos/1
  # DELETE /videos/1.xml
  def destroy
    @video = Video.find(params[:id])
    @video.destroy

    respond_to do |format|
      format.html { redirect_to(videos_url) }
      format.xml  { head :ok }
    end
  end
end
