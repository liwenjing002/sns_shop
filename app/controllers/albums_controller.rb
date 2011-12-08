class AlbumsController < ApplicationController
  respond_to :html,:js
  cache_sweeper :person_sweeper,  :only => %w(create update destroy)

  def index
    if params[:person_id]
      @person = Person.find(params[:person_id])
      if @logged_in.can_see?(@person)
        @albums = @person.albums.all
      else
        render :text => t('not_authorized'), :layout => true, :status => 401
      end
    elsif params[:group_id]
      @group = Group.find(params[:group_id])
      if @logged_in.can_see?(@group)
        @albums = @group.albums.all
      else
        render :text => t('not_authorized'), :layout => true, :status => 401
      end
    end
     respond_to do |format|
        if request.xhr?  
           format.js
        else
           format.html # index.html.erb
      end
    end
  end

  def show
    @album = Album.find(params[:id])
    redirect_to album_pictures_path(@album)
  end

  def new
    if @group = Group.find_by_id(params[:group_id]) and can_add_pictures_to_group?(@group)
      @album = @group.albums.build
    else
      @album = Album.new(:is_public => true)
    end
  end

  def can_add_pictures_to_group?(group)
    group.pictures? and (@logged_in.member_of?(group) or group.admin?(@logged_in))
  end

  def create
    @album = Album.new(params[:album])
    if @album.group and !can_add_pictures_to_group?(@album.group)
      @album.errors.add(:base, t('albums.cannot_add_pictures_to_group'))
    end
    if params['remove_owner'] and @logged_in.admin?(:manage_pictures)
      @album.person = nil
      @album.is_public = true
    else
      @album.person = @logged_in
    end
    if @album.save
      flash[:notice] = t('albums.saved')
      redirect_to @album
    else
      render :action => 'new'
    end
  end

  def edit
    @album = Album.find(params[:id])
    unless @logged_in.can_edit?(@album)
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def update
    @album = Album.find(params[:id])
    if @logged_in.can_edit?(@album)
      if @album.update_attributes(params[:album])
        flash[:notice] = t('Changes_saved')
        redirect_to @album
      else
        render :action => 'edit'
      end
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def destroy
    @album = Album.find(params[:id])
    if @logged_in.can_edit?(@album)
      @album.destroy
      redirect_to albums_path
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def get_pics_by_id
     @album = Album.find(params[:id])
     pics = []
     @album.pictures.each do |pic|
       pics.push(pic.photo.url(:original))
     end
      render :json =>pics
  end

end
