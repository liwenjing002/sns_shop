class Location::PostitionsController < ApplicationController
 
  
  def create
    Postition.create(params[:postition]) unless Postition.find(:all,:conditions=>params[:postition]).length>0
   render :json=>"success"
  end
  
end
