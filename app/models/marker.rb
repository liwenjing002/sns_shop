class Marker < ActiveRecord::Base
  def object
    if self.object_type == "Note"
      Note.find(self.object_id)
    end
  end
  
  def html
     if self.object_type == "Note"
       Note.find(self.object_id).body
    end
  end
  
end
