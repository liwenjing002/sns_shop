module MarkersHelper

  def add_html_to_marker(markers)
    markers.each do |marker|
      marker.marker_html = raw(mark_html(marker))
    end
  end 

  def mark_html(marker,object)
    html =''
    method = marker.object_type.downcase+"_html(marker,object)"
    html = eval(method)
    html.html_safe
  end
  
  def place_html(marker,object)
    html =''
  	html << "#{render :partial => 'common/place_info',:locals => {:place=>object,:marker=>marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
    marker.marker_html = html.html_safe
    marker.save
    html
  end
  
  def note_html(marker,object)
    html =''
    html << "#{render :partial => 'common/marker_info',:locals => {:marker=> marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
    
    if marker.marker_html
    marker.marker_html = (marker.marker_html+ html.html_safe) 
    else
    marker.marker_html = html.html_safe 
    end
    marker.save
    marker.marker_html
  end
  
end
