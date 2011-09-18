class Postition < ActiveRecord::Base
  belongs_to :person
  #我的一天轨迹
  # date 格式 %y/%m/%d
  def self.find_my_locus date,person_id,is_return_html
    html =[]        
    postitions =  Postition.find(:all,:conditions=>["DATE_FORMAT(created_at,'%Y/%m/%d') = ? and person_id =? ",date,person_id],
      :order=>"created_at desc")
    if is_return_html
      postitions.each do |postition|
        html<<  {:html=>"<div>"+postition.current_address+"</div>",
          :longitude=>postition.current_longitude,
          :latitude=>postition.current_latitude,
          :marker_id=>postition.id,
          :geocode_position=>postition.current_address
        }
      end
      html
    else
      postitions
    end
  end
  
  def self.find_friend_locus date,person_id
    html =[]
    Postition.find(:all,:joins=>"left join friendships on friendships.friend_id = postitions.person_id",
      :conditions=>["DATE_FORMAT(postitions.created_at,'%Y/%m/%d') = ? 
                                  and friendships.person_id = ?",date,person_id]).each do |postition|
      html<<  {:html=>"<div>"+postition.person.name+postition.current_address+"</div>",
        :longitude=>postition.current_longitude,
        :latitude=>postition.current_latitude,
        :geocode_position=>postition.current_address
      }
    end
    html
  end
end
