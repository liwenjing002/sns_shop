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

  
  #  决定了 一次只能上传一个图片，每一张图片都有自己的故事
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
    
    if params[:picture]
      picture = @album.pictures.create(
        :person => (params[:remove_owner] ? nil : @logged_in),
        :photo  => params[:picture],
        :photo_text  => params[:photo_text],
        :longitude=> (params[:marker]and params[:marker][:marker_longitude])?params[:marker][:marker_longitude]:"",
        :latitude=> (params[:marker]and params[:marker][:marker_latitude])?params[:marker][:marker_latitude]:"",
        :location=> params[:marker]?params[:marker][:geocode_position]:""
      )
      if picture.errors.any?
        errors = picture.errors.full_messages
        @notice += " " + errors.join('; ') if errors.any?   if picture.errors.any?
      else
        @notice = t('pictures.saved', :success => "success")
      end
    end
    redirect_to params[:redirect_to] || @group || album_pictures_path(@album)

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
