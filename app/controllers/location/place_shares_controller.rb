class Location::PlaceSharesController < ApplicationController
  def show
    redirect_to(location_place_path(PlaceShare.find(params[:id]).stream_item.place_id))
  end
end
