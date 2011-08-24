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
    markers = []
    markers = find_all_by_owner_id_and_object_type id,"Place"
    markers = markers+    find_by_sql("SELECT b.* FROM (SELECT m.* FROM markers m ORDER BY updated_at DESC) b GROUP BY DATE_FORMAT(updated_at,'%y%m%d') ORDER BY created_at DESC ")
#      find(:all,:conditions=>["object_type=?","Note"],:group=>"DATE_FORMAT(created_at,'%y%m%d')")
    markers

  end
  
end
