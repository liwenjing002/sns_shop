module StreamsHelper
  include MessagesHelper

  def stream_item_path(stream_item)
    if stream_item.streamable_type == 'Place' or stream_item.streamable_type == 'PlaceShare'
      send("location_" +stream_item.streamable_type.underscore + '_path', stream_item.streamable_id)
    elsif stream_item.streamable_type == 'Album'
       send('album_pictures_path', stream_item.streamable_id)
    else
      send(stream_item.streamable_type.underscore + '_path', stream_item.streamable_id)
    end
    
  end

  def stream_item_url(stream_item)
    send(stream_item.streamable_type.underscore + '_url', stream_item.streamable_id)
  end

  #获得信息的主体 ，使用help 不使用partity 后者严重影响性能
  def stream_item_content( stream_item,show_on )
    stream_item.streamable_type
    method = stream_item.streamable_type.downcase+"(stream_item,show_on )"
    return raw eval(method)
  end

  def note stream_item,show_on 
    html = ""
    html  += stream_item.body.html_safe
    html   += location_html show_on,  stream_item.id,stream_item.streamable.location,stream_item.streamable.longitude,stream_item.streamable.latitude
  end

  def album stream_item,show_on
    html = ""
    if stream_item.context.any?
      stream_item.context['picture_ids'].to_a.each do |picture_id, fingerprint, extension,photo_text,longitude,latitude,location|
        if show_on == "wall"
          html += link_to image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :large), :alt => t('pictures.click_to_enlarge'), :class => 'stream-pic',:rel=>"#mies#{stream_item.id}"),  album_picture_path(stream_item.streamable_id, picture_id), :title => t('pictures.click_to_enlarge')
          html += "<div class='simple_overlay' id='mies#{stream_item.id}'>#{image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :original),:alt => t('pictures.click_to_enlarge'))}</div>"
        else
          html += link_to image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :small), :alt => t('pictures.click_to_enlarge'), :class => 'stream-pic',:rel=>"#mies#{stream_item.id}"),
            album_picture_path(stream_item.streamable_id, picture_id), :title => t('pictures.click_to_enlarge')
        end
       
        html +="<div>#{raw photo_text}</div>" if !is_blank photo_text
        html   += location_html show_on, stream_item.id,location,longitude,latitude
      end
    end
    html 
  end

  def video stream_item,show_on
    html = ""
    html += link_to image_tag(stream_item.streamable.screenshots_url||"missing_large.png", :alt => "点击放大", :class => 'stream-video',:rel=>"#mies#{stream_item.id}"),
      stream_item.streamable, :title => "点击放大"
    html += "<div>#{stream_item.streamable.desc.html_safe}</div><div class='simple_overlay' id='mies#{stream_item.id}> #{raw stream_item.streamable.video_url}</div>" if !is_blank stream_item.streamable.desc
    html   += location_html show_on,  stream_item.id,stream_item.streamable.location,stream_item.streamable.longitude,stream_item.streamable.latitude
  end
  
  def place stream_item,show_on
    html  = ""
    if show_on == "wall"
      html +=    " <div id='place_title'>"
      if marker_follow?(stream_item.marker)
        html +=  " <span>#{link_to_function "取消关注","chang_follow($(this))",:id=>"cancer_wall",:class=>"follow_link",:action=>"cancer",:marker_id=>stream_item.marker.id,:marker_type=>'Place'}</span>"
      else
        html +=   " <span>#{link_to_function "添加关注","chang_follow($(this))",:id=>"follow_wall",:class=>"follow_link",:action=>"add",:marker_id=>stream_item.marker ? stream_item.marker.id : '',:marker_type=>'Place'}</span>"
      end
      html += "</div>"
      html +=link_to  image_tag(stream_item.streamable.picture ? stream_item.streamable.picture.photo(:large) : "missing_large.png", :alt => t('pictures.click_to_enlarge'),
        :class => 'stream-pic',:rel=>"#mies#{stream_item.id}"),
        [:location, stream_item.streamable], :title => t('pictures.click_to_enlarge')

      html += "  <div class='simple_overlay' id='mies#{stream_item.id}'>#{image_tag(stream_item.streamable.picture ? stream_item.streamable.picture.photo(:original) : "missing_small.png", :alt => t('pictures.click_to_enlarge'),
      :class => 'stream-pic',:rel=>"#mies#{stream_item.id}")}</div>"
    else
      html +=    " <div id='place_title'>"
      if marker_follow?(stream_item.marker)
        html +=  " <span>#{link_to_function "取消关注","chang_follow($(this))",:id=>"cancer_wall",:class=>"follow_link",:action=>"cancer",:marker_id=>stream_item.marker.id,:marker_type=>'Place'}</span>"
      else
        html +=   " <span>#{link_to_function "添加关注","chang_follow($(this))",:id=>"follow_wall",:class=>"follow_link",:action=>"add",:marker_id=>stream_item.marker ?stream_item. marker.id : '',:marker_type=>'Place'}</span>"
      end
      html += "</div>"
      html += link_to(
        image_tag(stream_item.streamable.picture ? stream_item.streamable.picture.photo(:small) : "missing_small.png", :alt => t('pictures.click_to_enlarge'),
          :class => 'stream-pic',:rel=>"#mies#{stream_item.id}"),
        location_place_path(stream_item.streamable), :title => t('pictures.click_to_enlarge')
      )
    end
    html
  end

  def placeshare  stream_item,show_on
    html = ""
    if stream_item.context.any?
      stream_item.context['picture_ids'].to_a.each do |picture_id, fingerprint, extension,text|
        if show_on == "wall"
          html += link_to image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :large), :alt => t('pictures.click_to_enlarge'), :class => 'stream-pic',:rel=>"#mies#{stream_item.id}"),  album_picture_path(stream_item.streamable_id, picture_id), :title => t('pictures.click_to_enlarge')
          html += "<div class='simple_overlay' id='mies#{stream_item.id}'>#{image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :original),:alt => t('pictures.click_to_enlarge'))}</div>"
        else
          html += link_to image_tag(Picture.photo_url_from_parts(picture_id, fingerprint, extension, :small), :alt => t('pictures.click_to_enlarge'), :class => 'stream-pic',:rel=>"#mies#{stream_item.id}"),
            album_picture_path(stream_item.streamable_id, picture_id), :title => t('pictures.click_to_enlarge')
        end
      end
    end

    html +="<div>#{raw stream_item.body}</div>" unless is_blank stream_item.body
    html
  end


  def location_html show_on, stream_item_id,location,longitude,latitude
    html = ""
    if show_on == "wall"
      if !is_blank location
        html +=  "<div stream_item_id='#{stream_item_id}' class='location_now' style='cursor:pointer;color:red'><span>发表位置：</span>#{location}</div>"
      end
      if !is_blank latitude
        marker_html = "#{longitude},#{latitude}"
      else if !is_blank location
          marker_html =location
        end
      end
      html += "<div class='tooltip_stream_item'><img src='http://api.map.baidu.com/staticimage?center=#{marker_html}&markers=#{marker_html}&&width=300&height=140&zoom=14'></img></div>" if  marker_html
    else
      html += "<div style='cursor:pointer;color:red'><span>发表位置：</span>#{location}</div>"
    end
    html
  end


  def activity
    
  end








  
  def recent_time_ago_in_words(time)
    if time >= 1.day.ago
      time_ago_in_words(time) + ' ' + t('stream.ago')
    else
      time.to_s
    end
  end

  private
  def activity stream_item
    content = ""
    if stream_item.streamable.creater == @logged_in
      content += "<div>创建活动： #{stream_item.streamable.name}</div>"
    else
      content += "<div>加入活动： #{stream_item.streamable.name}</div>"
    end
    content += "<div>活动时间：#{stream_item.streamable.activity_time.strftime("%y-%m-%d")}</div><div>活动地点:#{stream_item.streamable.location}</div>"
    content
  end
  
  def add_ditu_pic stream_item_id ,object
    content = ""
    content += (" <div stream_item_id = '#{stream_item_id}' class='location_now' style='cursor:pointer;color:red'><span color: #5F9128>发表位置：</span>"+object.location+"</div>") if  !is_blank object.location
    marker = ""
    if !is_blank object.latitude 
      marker = "#{object.longitude},#{object.latitude}"
    else if !is_blank object.location
        marker = object.location
      end
    end
    content += "<div class='tooltip_stream_item'><img src='http://api.map.baidu.com/staticimage?center=#{marker}&markers=#{marker}&width=300&height=140&zoom=13'></img></div>" if marker != ""
    return content
  end
    

end
