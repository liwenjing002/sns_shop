module MarkersHelper

  def add_html_to_marker(markers)
    markers.each do |marker|
      marker.marker_html = raw(mark_html(marker))
    end
  end 

  def mark_html(marker)
    html =''
    method = marker.object_type.downcase+"_html(marker)"
    html = eval(method)
    html.html_safe
  end
  
  def place_html(marker)
    html =''
  	html << "#{render :partial => 'common/place_info',:locals => {:place=>marker.object,:marker=>marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
  end
  
  def streamitem_html(marker)
    html =''
    html << "#{render :partial => 'common/marker_info',:locals => {:marker=> marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
  end
  
  
  def destination_html(marker)
        html =''
    html << "#{render :partial => 'common/destination_marker',:locals => {:marker=> marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
  end
  
end
