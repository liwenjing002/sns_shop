class StreamsController < ApplicationController

  skip_before_filter :authenticate_user, :only => %w(show)
  before_filter :authenticate_user_with_code_or_session, :only => %w(show)

  def show
    @stream_items = @logged_in.shared_stream_items(params[:page]||1,30,true)
    @person = @logged_in
    @has_friendship_requests = @logged_in.pending_friendship_requests.count > 0
    @has_activity_invite = (@logged_in.invite_activities.count + @logged_in.process_activities.count)>0
      respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @events }
      format.js
    end
  end
end
