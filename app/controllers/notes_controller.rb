class NotesController < ApplicationController
  respond_to :html,:js
  def index
    if params[:person_id]
      @person = Person.find(params[:person_id])
      if @logged_in.can_see?(@person)
        @notes = @person.notes.paginate(:order => 'created_at desc', :page => params[:page])
      else
        render :text => t('not_authorized'), :layout => true, :status => 401
      end
    elsif params[:group_id]
      @group = Group.find(params[:group_id])
      if @logged_in.can_see?(@group) and @group.blog?
        @notes = @group.notes.paginate(:order => 'created_at desc', :page => params[:page])
      else
        render :text => t('not_authorized'), :layout => true, :status => 401
      end
    else
      render :text => t('There_was_an_error'), :status => 400
    end
  end

  def show
    @note = Note.find(params[:id])
    if @logged_in.can_see?(@note)
      #      if @note.stream_item.is_marker #note 带地理标记，定向到轨迹页面
      #         redirect_to(locus_index_markers_path({:id=>@note.stream_item_id}))
      #      else
      @person = @note.person
      #      end
      
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def new
    @note = Note.new(:group => Group.find_by_id(params[:group_id]))
  end

  def create
    params[:note][:person_id] =  @logged_in.id
    params[:marker][:owner_id] =  @logged_in.id
    if  (params[:marker][:geocode_position]!= '' and
        params[:marker][:geocode_position]!= '地球某地')  or (        params[:marker][:marker_longitude]!= '' and
        params[:marker][:marker_latitude]!= '')

      is_location = true 
    else
      is_location = false
    end
    
    params[:note][:location] = params[:marker][:geocode_position] if is_location
    params[:note][:longitude] = params[:marker][:marker_longitude] if is_location
    params[:note][:latitude] = params[:marker][:marker_latitude] if is_location
    @note = Note.create(params[:note]) 
    if is_location
      params[:marker][:marker_longitude] = BigDecimal.new(params[:marker][:marker_longitude])
      params[:marker][:marker_latitude] = BigDecimal.new(params[:marker][:marker_latitude])
      @marker_at = Marker.new(params[:marker])

      MarkerToMap.create({:map=>@logged_in.map,:marker=>@marker_at,:marker_type=>'StreamItem'})
      @marker_at.object_type = "StreamItem"
      @marker_at.object_id = @note.stream_item_id
      @marker_at.save
      @last_destination = @marker_at.get_last_destination(Time.new)
    end
    flash[:notice] = t('notes.saved')
  end

  def edit
    @note = Note.find(params[:id])
    unless @logged_in.can_edit?(@note)
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def update
    @note = Note.find(params[:id])
    if @logged_in.can_edit?(@note)
      if @note.update_attributes(params[:note])
        redirect_to @note
      else
        render :action => 'edit'
      end
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @logged_in.can_edit?(@note)
      @note.destroy
      if @note.group
        redirect_to group_path(@note.group, :anchor => 'blog')
      else
        redirect_to person_path(@note.person, :anchor => 'blog')
      end
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end



end
