module PeopleHelper
  include StreamsHelper

  def linkify(text, attribute)
    text = h(text)
    text.split(/,\s*/).map do |item|
      link_to item, search_path(attribute => item)
    end
  end

  def attribute(attribute, &block)
    if @person.send(attribute).to_s.any? and @person.show_attribute_to?(attribute, @logged_in)
      capture(&block)
    end
  end
  
  def private(type)
    return true if @person==@logged_in
    @person.privacy_controll(type,@logged_in)
  end
  
  
  def mark_html(marker)
    html =''
	html << "#{render :partial => 'common/marker_info',:locals => {:marker=> marker}}"
# html << "<div id = 'stream_item_"+ marker.id.to_s + "''" +" class='stream-item' style='margin-bottom: 0px;min-height:70px;height:auto;min-width:200px;width:auto;'><div class='stream-item-meta'>"
# html << "#{render :partial => 'streams/person_thumbnail', :locals => {:stream_item => marker.object} }"
# html << "<div style='clear:left;'></div></div><div class='stream-item-body'><div class='stream-item-content'>"
# html << "#{raw marker.html}"
# html << "#{link_to t('comments.view') + '...', marker.object, :class => 'small' ,:target=>'_blank'} </div>"
# html << "<div class='nowrap stream-item-timestamp'>"
# html << "#{time_ago_in_words marker.object.created_at}#{t('comments.ago') } by #{ link_to marker.object.person.name, marker.object.person,:target=>'_blank' }</div></div>"
# html << "<div class = 'marker_address'></div>"    
# html << "<div class ='marker_common' > <span><a href='#' onclick='MapObject.marker_del(#{marker.id})'>delete</a></span>"  
# html << "<span><a href='#' onclick='MapObject.marker_move(#{marker.id})'>move</a></span></div></div>"
    
    html = html.gsub(/\'/, '"')
    html = html.gsub(/[\n\r]/,'')
  end

  def get_address_href(long_address)
   add_arr = long_address.split(/\|/)
   add_html = ""
    add_arr.each do |add|
      add_html << "<span class = 'mr20'><a href= '#'>#{add}</a></span>"
	end
   add_html.html_safe
  end
  
end
