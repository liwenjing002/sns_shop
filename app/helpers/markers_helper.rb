module MarkersHelper

	 def add_html_to_marker(markers)
	 markers.each do |marker|
	 marker.marker_html = raw(mark_html(marker))
     end
	 end 

	 def mark_html(marker)
    html =''
	html << "#{render :partial => 'common/marker_info',:locals => {:marker=> marker}}"
  
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
  end
end
