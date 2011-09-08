class Marker < ActiveRecord::Base
  belongs_to :map
  belongs_to :owner, :class_name => 'Person'
  belongs_to :object, :polymorphic => true

  
  def html
    if self.object_type == "Note"
      Note.find(self.object_id).body
    end
  end
  
  def self.find_my_marker id
    markers = find_all_by_owner_id_and_object_type id,"Place"
    markers
  end
  
  #我的一天轨迹
  # date 格式 %y/%m/%d
  def self.find_my_locus date
    Marker.find(:all,:conditions=>["DATE_FORMAT(created_at,'%Y/%m/%d') = ? and (object_type = 'StreamItem' )",date],
      :order=>"created_at desc")                      
  end
  
  #获取我当前@地点和go2的地点
  def self.find_my_location
    markers = []
    date = Time.now if date == nil
    #当前最新位置
    marker_at = find_by_sql("SELECT b.* FROM (SELECT m.* FROM markers m where m.object_type = 'StreamItem' 
                         and DATE_FORMAT(created_at,'%y%m%d') = #{date.strftime("%y%m%d")} 
                        ORDER BY updated_at DESC) b GROUP BY DATE_FORMAT(updated_at,'%y%m%d') ORDER BY created_at DESC ")
    #当前最新目的地
    marker_to = Marker.find(:all,:conditions=>["DATE_FORMAT(created_at,'%y%m%d') = ? and object_type = 'StreamItem' and is_destin = true",date.strftime("%y%m%d")],
      :order=>"created_at desc",:limit=>1)
    markers += marker_at if marker_at != nil and marker_at.length>0
    markers += marker_to if marker_to != nil and marker_to.length>0
  end
  
    #上一个marker 和下一个marker
  def self.marker_last_next marker_id,key
    marker_now = Marker.find_by_id(marker_id)
    if marker_now
      if key == "last"
        marker = Marker.find(:all,:conditions=>["id < ? and DATE_FORMAT(created_at,'%y%m%d') = ? and object_type != 'Place'",marker_now.id,marker_now.created_at.strftime("%y%m%d")],:order=>"id desc",:limit=>1)
      end
      if key == "next"
        marker = Marker.find(:all,:conditions=>["id > ? and DATE_FORMAT(created_at,'%y%m%d') = ? and object_type != 'Place'",marker_now.id,marker_now.created_at.strftime("%y%m%d")],:order=>"id desc",:limit=>1)
      end
    end
    return marker[0] if marker and marker.length >0
  end
  
  
  #h获取上一个目的地
  def get_last_destination date 
    Marker.find(:all,:conditions=>["DATE_FORMAT(created_at,'%y%m%d') = ? and object_type = 'StreamItem' and destin_position  != ''",date.strftime("%y%m%d")],
      :order=>"created_at desc",:limit=>1)
  end
  

end
