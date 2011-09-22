module StreamsHelper
  include MessagesHelper

  def stream_item_path(stream_item)
    if stream_item.streamable_type == 'Place' or stream_item.streamable_type == 'PlaceShare'
    send("location_" +stream_item.streamable_type.underscore + '_path', stream_item.streamable_id)
    else
    send(stream_item.streamable_type.underscore + '_path', stream_item.streamable_id)
    end
  end

  def stream_item_url(stream_item)
    send(stream_item.streamable_type.underscore + '_url', stream_item.streamable_id)
  end

  def stream_item_content(stream_item, use_code=false)
    content = ''

    if stream_item.context.any?
      content += "<div id= 'pic_share'>"
      content += "<div id= 'triggers'>"
      content +=  "".tap do |content_temp|
        stream_item.context['picture_ids'].to_a.each do |picture_id, fingerprint, extension|
           
          temp = ''+link_to(
            image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :large), :alt => t('pictures.click_to_enlarge'), :class => 'stream-pic',:rel=>"#mies#{picture_id}"),
            album_picture_path(stream_item.streamable_id, picture_id), :title => t('pictures.click_to_enlarge')
          ) 
          
          temp += '<div class="simple_overlay" id="mies'+picture_id.to_s+'">' + image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :original),:alt => t('pictures.click_to_enlarge')) +'</div>'
#                text = Picture.find()
      content += "<div>描述：#{}</div>"
          content_temp <<  temp
        end
      end.html_safe
      content += "</div>"
      content += "</div>"

    end
    if stream_item.body
      content += "<div id= 'text_share'>"
      content += if stream_item.streamable_type == 'Message'
        render_message_body(stream_item)
      else
        sanitize_html(auto_link(stream_item.body))
      end
      content += "</div>"
    end
    if use_code
      content.gsub!(/<img([^>]+)src="(.+?)"/) do |match|
        url = $2 + ($2.include?('?') ? '&' : '?') + 'code=' + @logged_in.feed_code
        "<img#{$1}src=\"#{url}\""
      end
    end
    content += (" <div id='location_now'><span color: #5F9128>发表位置：</span>"+stream_item.streamable.location+"</div>") if !is_blank stream_item.streamable.location if stream_item.streamable_type == 'Note'
    raw content
  end

  def recent_time_ago_in_words(time)
    if time >= 1.day.ago
      time_ago_in_words(time) + ' ' + t('stream.ago')
    else
      time.to_s
    end
  end

end
