class GroupsController < ApplicationController
  cache_sweeper :group_sweeper, :only => %w(create update destroy batch)
  before_filter :get_visit_history
  def index
    # people/1/groups
    
    if params[:person_id]
      @person = Person.find(params[:person_id])
      @groups = @person.groups
    else
      @categories = Group.category_names
      conditions = []
      conditions.add_condition ["hidden = ?",false]
      conditions.add_condition ['category = ?', params[:category]] if params[:category]
      conditions.add_condition ['name like ?', '%' + params[:name] + '%'] if params[:name]
      @groups = Group.find(:all, :conditions => conditions, :order => 'name')
    end
    respond_to do |format|
      format.js   
      format.html 
    end
  end

  def show
    @group = Group.find(params[:id])
    @person = @logged_in
    respond_to do |format|
      if request.xhr?  
        format.js
      else
        if  (not @group.private? and not @group.hidden?) or @group.admin?(@logged_in)
          @stream_items = @group.shared_stream_items(20)
        else
          @stream_items = []
        end
        format.html # index.html.erb
      end
    end
  end


  def get_members
    @group = Group.find(params[:group_id])
    @members = @group.people.thumbnails
    respond_to do |format|
      if request.xhr?
        format.js
      else
        format.html # index.html.erb
      end
    end
  end

  def new
    if Group.can_create?
      @group = Group.new(:creator_id => @logged_in.id)
      @categories = Group.categories.keys
      respond_to do |format|
        if request.xhr?  
          format.js
        else
          format.html # index.html.erb
        end
      end
    else
      render :text => t('groups.no_more'), :layout => true, :status => 401
    end
  end

  def create
    if Group.can_create?
      if !params[:id] or params[:id]==""
        @group = Group.new()
      else
        @group = Group.find(params[:id])
      end
      @group.creator = @logged_in
      @group.photo = params[:group][:photo] if params[:group][:photo]
      @group.hidden=false
      if @group.update_attributes(params[:group])
        if @logged_in.admin?(:manage_groups)
          @group.update_attribute(:approved, true)
          flash[:notice] = t('groups.created')
        else
          @group.memberships.create(:person => @logged_in, :admin => true)
          flash[:notice] = t('groups.created_pending_approval')
        end
        @person= @logged_in
        respond_to do |format|
          if request.xhr?
            format.js
          else
            format.html # index.html.erb
          end
        end
      else
        @categories = Group.categories.keys
        respond_to do |format|
          if request.xhr?
            format.js{ render :action => "new"}
          else
            format.html # index.html.erb
          end
        end
      end
    else
      render :text => t('groups.no_more'), :layout => true, :status => 401
    end
  end

  def edit
    @group ||= Group.find(params[:id])
    if @logged_in.can_edit?(@group)
      @categories = Group.categories.keys
      @members = @group.people.all(:order => ' first_name', :select => 'people.id')
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end
  #改头像
  def change_pic
    if params[:group][:photo]
      if !params[:id] or params[:id]==""
        @group = Group.new({:hidden=>true})
      else
        @group = Group.find(params[:id])
      end
      @group.creator = @logged_in
      @group.photo = params[:group][:photo]
      @group.save(:validate => false)
      render :text => "{success:'" + "true" + "',group_id:'#{@group.id}', pic_id:'" + @group.photo.id.to_s + "',pic_url:'" + @group.photo.url(:profile) + "'}";
    else
      render :text => "{success:'" + "true}" 
    end
 
  end
  
  def update
    @group = Group.find(params[:id])
    @member_of = @logged_in.member_of?(@group)
    @person = @logged_in
    if @logged_in.can_edit?(@group)
      params[:group][:photo] = nil if params[:group][:photo] == 'remove'
      params[:group].cleanse 'address'
      if @group.update_attributes(params[:group])
        flash[:notice] = t('groups.settings_saved')
        respond_to do |format|
          if request.xhr?
            format.js{ render :action => "show"}
          else
            format.html # index.html.erb
          end
        end
      else
        edit; render :action => 'edit'
      end
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def destroy
    @group = Group.find(params[:id])
    
    if @logged_in.can_edit?(@group)
      @group.destroy
      flash[:notice] = t('groups.deleted')
      redirect_to groups_path
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  def batch
    if @logged_in.admin?(:manage_groups)
      if request.post?
        respond_to do |format|
          format.html do
            @groups = Group.all(:order => 'category, name')
            @groups.group_by(&:id).each do |id, groups|
              group = groups.first
              if vals = params[:groups][id.to_s]
                group.update_attributes(vals)
              end
            end
          end
          format.js do
            @errors = []
            Array(params[:groups]).each do |id, details|
              group = Group.find(id)
              unless group.update_attributes(details)
                @errors << [id, group.errors.full_messages]
              end
            end
          end
        end
      else
        @groups = Group.all(:order => 'category, name')
      end
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  end

  private

  def feature_enabled?
    unless Setting.get(:features, :groups) and (Site.current.max_groups.nil? or Site.current.max_groups > 0)
      redirect_to people_path
      false
    end
  end
  
  

  
end
