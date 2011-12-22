class PeopleController < ApplicationController
	respond_to :html,:js
  cache_sweeper :person_sweeper,:only => %w(create update destroy import batch)

  def index
    respond_to do |format|
      format.html { redirect_to person_path(@logged_in, :tour => params[:tour]) }
      if can_export?
        format.xml do
          job = Person.create_to_xml_job
          redirect_to generated_file_path(job.id)
        end
        format.csv do
          job = Person.create_to_csv_job
          redirect_to generated_file_path(job.id)
        end
      end
    end
  end

  def show
    if params[:id].to_i == session[:logged_in_id]
      @person = @logged_in
    else
      @person = Person.find_by_id(params[:id])
      session[:visit_people]= Array.new if !session[:visit_people]
      if session[:visit_people].length < 4
        session[:visit_people].push(params[:id]) 
      else
        session[:visit_people].drop(0)
        session[:visit_people].push(params[:id]) 
      end
    end
  #访问历史  
  @visit_peoples = Person.where("id in (:ids)",:ids=>session[:visit_people]) if  session[:visit_people]
  #推荐好友
  @tag_peoples =  @person.tag_peoples
  @stream_items = @person.all_stream_itmes(params[:page]||1,30,true)
  @has_friendship_requests = @person.pending_friendship_requests.count > 0
  @people_tags= Tag.where("tag_type= 'Person'")
  respond_to do |format|
    if request.xhr?  
      format.js
    else
      format.html # index.html.erb
    end
  end
    
end
  
#  获取个人信息
def get_profile
  @person = Person.find_by_id(params[:id])
end

def new
  if Person.can_create?
    @business_categories = Person.business_categories
    @custom_types = Person.custom_types
    if @logged_in.admin?(:edit_profiles)
      defaults = {:can_sign_in => true, :visible_to_everyone => true, :visible_on_printed_directory => true, :full_access => true}
      @person = Person.new(defaults)
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  else
    render :text => t('people.cant_be_added'), :layout => true, :status => 401
  end
end

def create
  if Person.can_create?
    if @logged_in.admin?(:edit_profiles)
      @business_categories = Person.business_categories
      @custom_types = Person.custom_types
      params[:person].cleanse(:birthday, :anniversary)
      @person = Person.new_with_default_sharing(params[:person])
      @person.map = Map.create()
      respond_to do |format|
        if @person.save
          format.html { redirect_to @person.family }
          format.xml  { render :xml => @person, :status => :created, :location => @person }
        else
          format.html { render :action => "new" }
          format.xml  { render :xml => @person.errors, :status => :unprocessable_entity }
        end
      end
    else
      render :text => t('not_authorized'), :layout => true, :status => 401
    end
  else
    render :text => t('people.cant_be_added'), :layout => true, :status => 401
  end
end

def edit
  @person ||= Person.find(params[:id])
  if @logged_in.can_edit?(@person)
    respond_to do |format|
      if request.xhr?  
        format.js
      else
        format.html # index.html.erb
      end
    end
  else
    render :text => t('not_authorized'), :layout => true, :status => 401
  end
end

def update
  @person = Person.find(params[:id])
  if @logged_in.can_edit?(@person)
    can_sign_in = @person.can_sign_in? # before it gets updated
    if updated = @person.update_from_params(params)
      if not can_sign_in and @person.can_sign_in? # changed
        flash[:show_verification_link] = true
      end
      respond_to do |format|
        format.html do
          flash[:notice] = t('people.changes_submitted')
          redirect_to @person
        end
        format.xml { render :xml => @person.to_xml } if can_export?
      end
    elsif params[:email]
      edit
    else
      edit; render :action => 'edit'
    end
  else
    render :text => t('not_authorized'), :layout => true, :status => 401
  end
end

def destroy
  if @logged_in.admin?(:edit_profiles)
    @person = Person.find(params[:id])
    if me?
      render :text => t('people.cant_delete_yourself'), :layout => true, :status => 401
    elsif @person.global_super_admin?
      render :text => t('people.cant_delete'), :layout => true, :status => 401
    else
      @person.destroy
      redirect_to @person.family
    end
  else
    render :text => t('not_authorized'), :layout => true, :status => 401
  end
end

  

  

  

def schema
  render :xml => Person.columns.map { |c| {:name => c.name, :type => c.type} }
end

def favs
  @person = Person.find(params[:id])
  unless @logged_in.can_see?(@person)
    render :text => t('people.not_found'), :status => 404, :layout => true
  end
end

def testimony
  @person = Person.find(params[:id])
  unless @logged_in.can_see?(@person)
    render :text => t('people.not_found'), :status => 404, :layout => true
  end
end


#改头像
def change_pic
  if @logged_in.can_edit?(@logged_in)
    if params[:picture]
      @logged_in.photo = params[:picture]
      if @logged_in.valid? or @logged_in.errors.select { |a, e| a == :photo_content_type }.empty?
        @logged_in.save(:validate => false)
        render :text => "{success:'" + "true" + "', pic_id:'" +@logged_in.photo.id.to_s + "',pic_url:'" + @logged_in.photo.url(:profile) + "'}";
        return 
      end
    end
  end
  render :text => "{success:'" + "false'}"
end

  def tags_change
    tags = params[:tags].gsub(/，/, ',')
    @person = Person.find(params[:person_id])
    @person.tag_list = tags
    @person.save
  end

def get_friends
  @person = @logged_in
  @person = Person.find(params[:person_id]) if params[:person_id]
  @pending = me? ? @person.pending_friendship_requests : []
  @all_peoples = @person.friends.paginate(:order => 'created_at desc',
    :page => params[:page]||1,:per_page => 20,
    :conditions=>["first_name like ?","%#{params[:people] ? params[:people][:first_name] : '%'}%"])
end

def get_all_people
  @person = @logged_in
  @person = Person.find(params[:person_id]) if params[:person_id]
  @all_peoples = Person.paginate :page => params[:page]||1,:per_page => 21
end

end
