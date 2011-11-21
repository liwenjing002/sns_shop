class PicturesController < ApplicationController
  respond_to :html,:js
  def index
    @album = Album.find(params[:album_id])
    @pictures = @album.pictures.paginate(:order => 'id', :page => params[:page])
  end

  def show
    @album = Album.find(params[:album_id])
    @picture = Picture.find(params[:id])
  end

  def next
    @album = Album.find(params[:album_id])
    ids = @album.picture_ids
    next_id = ids[ids.index(params[:id].to_i)+1] || ids.first
    redirect_to album_picture_path(params[:album_id], next_id)
  end

  def prev
    @album = Album.find(params[:album_id])
    ids = @album.picture_ids
    prev_id = ids[ids.index(params[:id].to_i)-1]
    redirect_to album_picture_path(params[:album_id], prev_id)
  end

  def create
    if params[:group_id]
      unless @group = Group.find(params[:group_id]) and @group.pictures? \
          and (@logged_in.member_of?(@group) or @logged_in.can_edit?(@group))
        render :text => t('There_was_an_error'), :layout => true, :status => 500
        return
      end
    end
    @album = (@group ? @group.albums : Album).find_or_create_by_name(
      if params[:album].to_s.any? and params[:album] != t('share.default_album_name')
        params[:album]
      elsif @group
        @group.name
      else
        @logged_in.name
      end
    ) { |a| a.person = @logged_in }
    success = fail = 0
    errors = []
    @pic_arr =[]
     if params[:pictures]
    Array(params[:pictures]).each do |pic|
      picture = @album.pictures.create(
        :person => (params[:remove_owner] ? nil : @logged_in),
        :photo  => pic,
        :photo_text  => params[:photo_text],
        :longitude=> (params[:marker]and params[:marker][:marker_longitude])?params[:marker][:marker_longitude]:"",
        :latitude=> (params[:marker]and params[:marker][:marker_latitude])?params[:marker][:marker_latitude]:"",
        :location=> params[:marker]?params[:marker][:geocode_position]:""
      )
      if picture.errors.any?
        errors += picture.errors.full_messages
      end
      if picture.photo.exists?
        success += 1
        @pic_arr << picture
        if @album.pictures.count == 1 # first pic should be default cover pic
          picture.update_attribute(:cover, true)
        end
      else
        fail += 1
        picture.log_item.destroy rescue nil
        picture.destroy rescue nil
      end
    end
    end
    if params[:picture]
       picture = @album.pictures.create(
        :person => (params[:remove_owner] ? nil : @logged_in),
        :photo  => params[:picture],
        :photo_text  => params[:photo_text],
        :longitude=> (params[:marker]and params[:marker][:marker_longitude])?params[:marker][:marker_longitude]:"",
        :latitude=> (params[:marker]and params[:marker][:marker_latitude])?params[:marker][:marker_latitude]:"",
        :location=> params[:marker]?params[:marker][:geocode_position]:""
      )
       @pic_arr << picture
    end


  @notice = t('pictures.saved', :success => success)
    @notice+= " " + t('pictures.failed', :fail => fail) if fail > 0
    @notice += " " + errors.join('; ') if errors.any?
    html = []
    
    @pic_arr.each do |pic|
      if params[:marker]
        params[:marker][:owner_id] =  @logged_in.id 
        unless params[:marker][:geocode_position]=='' and params[:marker][:marker_longitude]=="" and params[:marker][:marker_latitude] ==''
          params[:marker][:marker_longitude] = BigDecimal.new(params[:marker][:marker_longitude].to_s)
          params[:marker][:marker_latitude] = BigDecimal.new(params[:marker][:marker_latitude].to_s)
          marker = Marker.new(params[:marker])

          MarkerToMap.create({:map=>@logged_in.map,:marker=>marker,:marker_type=>'StreamItem'})
          marker.object_type = "StreamItem"
          marker.object_id = pic.stream_item_id
          marker.save
          html << {:pic_id=>pic.id,:marker_id=>marker.id}   
          next
        end
      else
        html << {:pic_id=>pic.id}
      end
       
    end

    if params[:picture]
      @file_url = @pic_arr[0].photo.url(:original) if @pic_arr and @pic_arr.length > 0
      render :text=> {:url=>@file_url,:title=>"",:state=>"SUCCESS"}.to_json
    else
    render :text=> {:success=>true,:html=>html,:notice=>@notice}.to_json
    #    redirect_to params[:redirect_to] || @group || album_pictures_path(@album)
    end
    end

  
  
  def get_stream_item
    @pic = Picture.find_by_id(params[:pic_id])
    @marker = Marker.find_by_id(params[:marker_id])
  end
  
  # rotate / cover selection
  def update
    @album = Album.find(params[:album_id])
    @picture = Picture.find(params[:id])
    if @logged_in.can_edit?(@picture)
      if params[:degrees]
        @picture.rotate params[:degrees].to_i
      elsif params[:cover]
        @album.pictures.all.each { |p| p.update_attribute :cover, false }
        @picture.update_attribute :cover, true
      end
      redirect_to [@album, @picture]
    else
      render :text => t('pictures.cant_edit'), :layout => true, :status => 401
    end
  end

  def destroy
    @album = Album.find(params[:album_id])
    @picture = Picture.find(params[:id])
    if @logged_in.can_edit?(@picture)
      @picture.destroy
      redirect_to @album
    else
      render :text => t('pictures.cant_delete'), :layout => true, :status => 401
    end
  end
  

 def upload
   render :layout=>false
 end
 
  
end
