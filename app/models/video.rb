#require "open-uri" 
class Video < ActiveRecord::Base
  belongs_to :person
  has_many :comments, :dependent => :destroy
  belongs_to :stream_item
  attr_accessor :html_url
  TUDOU_KEY ="b7455c912bdaf49b"
  TUDOU_SECRET = "6a32869482da7ad12f7d2db2cb80ccd5"
  URL_PATTERN = {
    "youku" => /^http(s)?\:\/\/(www\.|v\.)?youku\.com\/v_show\/id\_([A-z0-9]{3,})\.html$/,
    "tudou" =>  /^http(s)?\:\/\/(www\.)?tudou\.com\/programs\/view\/([A-z\-0-9]{3,})(\/)?$/,
    "tudou1" =>  /^http(s)?\:\/\/(www\.)?tudou\.com\/playlist\/([0-9a-z]{1,}).do\?lid\=([0-9a-z]{3,})$/,
    "tudou2" =>  /^http(s)?\:\/\/(www\.)?tudou\.com\/playlist\/p\/([0-9a-z]{1,}).html$/,
    "kuliu" =>  /^http(s)?\:\/\/(www\.|v\.)?ku6\.com\/show\/([A-z0-9]{3,})\.html/
  }
 
  EMBED_URL = {
    "youku" => Proc.new{|video_id,video|
      video.video_url = "<embed src='http://player.youku.com/player.php/sid/#{video_id}.swf' allowFullScreen='true' quality='high' width='480' height='400' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>"
          uri = "http://v.youku.com/player/getPlayList/VideoIDS/#{video_id}/version/5/source/out?onData=%5Btype%20Function%5D&n=3"
      html_response = nil  
      open(uri) do |http|  
      html_response = JSON.parse(http.read)
      end
      video.screenshots_url = html_response["data"][0]["logo"]
    },
    "tudou" => Proc.new{|video_id,video|
      video.video_url = "<embed src='http://www.tudou.com/v/#{video_id}' quality='high' width='480' height='400' allowScriptAccess='sameDomain' type='application/x-shockwave-flash'></embed>"
    uri ="http://api.tudou.com/v3/gw?method=item.info.get&appKey=#{Video::TUDOU_KEY}&format=json&itemCodes=#{video_id}"
       html_response = nil  
      open(uri) do |http|  
      html_response = JSON.parse(http.read)
      end
      video.screenshots_url = html_response["multiResult"]["results"][0]["picUrl"]
    },
    "tudou1" => Proc.new{|video_id,video|
      video.video_url = "<embed src='http://www.tudou.com/v/#{video_id}' quality='high' width='480' height='400' allowScriptAccess='sameDomain' type='application/x-shockwave-flash'></embed>"},

    "tudou2" => Proc.new{|video_id,video|
      video.video_url = "<embed src='http://www.tudou.com/v/#{video_id}' quality='high' width='480' height='400' allowScriptAccess='sameDomain' type='application/x-shockwave-flash'></embed>"},
    "kuliu" => Proc.new{|video_id,video|
      video.video_url = "<embed src='http://player.ku6.com/refer/#{video_id}/v.swf' quality='high' width='480' height='400' allowScriptAccess='sameDomain' type='application/x-shockwave-flash'></embed>"},
  }

  before_create :parseurl
  after_create :create_as_stream_item
  
  def parseurl
    Video::URL_PATTERN.each { |key,value|
      m = value.match(self.html_url)
      if m
        Video::EMBED_URL[key].call(m[3],self)
      end
      
    }
  end
  
  
  def create_as_stream_item
    return unless person
    item = StreamItem.create!(
      :title           => name,
      :person_id       => person_id,
      :streamable_type => 'Video',
      :streamable_id   => id,
      :created_at      => created_at,
      :shared          => true 
    )
    self.stream_item_id = item.id
    self.save
  end

end
