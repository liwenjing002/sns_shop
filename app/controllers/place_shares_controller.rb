class PlaceSharesController < ApplicationController
  def show
    redirect_to(place_path(PlaceShare.find(params[:id]).stream_item.place_id))
  end
end
