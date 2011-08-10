module MarkersHelper

	 def add_html_to_marker(markers)
	 markers.each do |marker|
	 marker.marker_html = raw(mark_html(marker))
     end
	 end 

	 def mark_html(marker,object)
    html =''
    if marker.object_type=='Place'
     html<< place_html(marker,object)
    else
  	html << "#{render :partial => 'common/marker_info',:locals => {:marker=> marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
    end
     html.html_safe
  end
  
    def place_html(marker,object)
    html =''
  	html << "#{render :partial => 'common/place_info',:locals => {:place=>object,:marker=>marker}}"
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
    marker.marker_html = html.html_safe
    marker.save
    html.html_safe
  end
  
end
