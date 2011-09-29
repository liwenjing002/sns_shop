class ActivitiesController < ApplicationController


  # GET /activities/1
  # GET /activities/1.xml
  def show
    @activity = Activity.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @activity }
    end
  end

  # GET /activities/new
  # GET /activities/new.xml
  def new
    @activity = Activity.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @activity }
    end
  end

  # GET /activities/1/edit
  def edit
    @activity = Activity.find(params[:id])
  end

  # POST /activities
  # POST /activities.xml
  def create
    params[:activity][:create_id] = @logged_in.id
    @activity = Activity.new(params[:activity])
    @activity.save
     flash[:notice] ="创建活动成功"
  end

  # PUT /activities/1
  # PUT /activities/1.xml
  def update
    @activity = Activity.find(params[:id])
    @activity.update_attributes(params[:activity])
    flash[:notice] ="修改活动成功"
  end

  # DELETE /activities/1
  # DELETE /activities/1.xml
  def destroy
    @activity = Activity.find(params[:id])
    @activity.destroy

    respond_to do |format|
      format.html { redirect_to(activities_url) }
      format.xml  { head :ok }
    end
  end
  
  def invite_friend
    @activity = Activity.find(params[:activity_id])
    friends_ids = params[:friends_ids].split(/,/)
    friends_ids.each do |friend|
      PeopleActivity.create({:activity_id=>@activity.id,:person_id=>friend,:status=>"w"})
    end
    render :json=>{:success=>true}
  end

  def index
     @person = Person.find(params[:person_id])
     @activity_invite = @person.people_activities(:condition=>["status=?","w"])
     @activities = @person.activities
  end
  
end
