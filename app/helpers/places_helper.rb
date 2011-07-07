module PlacesHelper
  def place_html(marker,place)
    html =''
  	html << "#{render :partial => 'common/place_info',:locals => {:place=>place,:marker=>marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
    marker.marker_html = html.html_safe
    marker.save
    html.html_safe
  end
end
