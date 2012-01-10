class StreamsController < ApplicationController
  respond_to :html,:js
  skip_before_filter :authenticate_user, :only => %w(show)
  before_filter :authenticate_user_with_code_or_session, :only => %w(show)

  def show
    @person = @logged_in
    if params[:person_id]
      @person = Person.find(params[:person_id])
      @page = params[:page]||1
      @stream_items = @person.all_stream_itmes(@page,30,true)


      @has_friendship_requests = @person.pending_friendship_requests.count > 0
      @has_activity_invite = (@person.invite_activities.count + @logged_in.process_activities.count)>0
    end
    if params[:group_id]
      @group = Group.find(params[:group_id])
      @stream_items = @group.all_stream_itmes(@page,30)
    end
    respond_to do |format|
      if request.xhr?
        format.js
      else
        format.html # index.html.erb
      end
    end
  end
end
