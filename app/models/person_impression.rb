class PersonImpression < ActiveRecord::Base
 belongs_to :impression
 belongs_to :person
 
  def self.get_desc object_type, object_id, person_id
    im = PersonImpression.find(:all,:conditions=>["object_type = ? and object_id = ? and person_id = ?",object_type,object_id,person_id])
    return im[0].impression.name if im and im.length >0
  end
  
  def self.count_impress_num object_type, object_id,impress_desc
    impress = Impression.find_by_name impress_desc
    PersonImpression.count(:conditions=>["object_type = ? and object_id = ? and impression_id = ? ",object_type, object_id,impress.id])
  end
  
end
