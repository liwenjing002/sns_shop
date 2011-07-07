class PostitionsController < ApplicationController
 
  def update_postition
    postition = Postition.find(params[:id]) if params[:id]
    postition.update_attributes(params[:postition]) if postition
        render :json=>{:success=>true}
  end
end
