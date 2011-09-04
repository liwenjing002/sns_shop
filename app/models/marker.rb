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
  def self.find_my_locus date
   Marker.find(:all,:conditions=>["DATE_FORMAT(created_at,'%y%m%d') = ? and (object_type = 'StreamItem' or object_type = 'Destination')",date.strftime("%y%m%d")],
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
    marker_to = Marker.find(:all,:conditions=>["DATE_FORMAT(created_at,'%y%m%d') = ? and object_type = 'Destination'",date.strftime("%y%m%d")],
                            :order=>"created_at desc",:limit=>1)
    markers += marker_at if marker_at != nil and marker_at.length>0
    markers += marker_to if marker_to != nil and marker_to.length>0
  end
  
  #h获取上一个目的地
  def get_last_destination date 
    Marker.find(:all,:conditions=>["DATE_FORMAT(created_at,'%y%m%d') = ? and object_type = 'Destination'",date.strftime("%y%m%d")],
                            :order=>"created_at desc",:limit=>1)
  end
end
