class Marker < ActiveRecord::Base
  belongs_to :map
  belongs_to :owner, :class_name => 'Person'
  belongs_to :object, :polymorphic => true

  
  def html
     if self.object_type == "Note"
       Note.find(self.object_id).body
    end
  end
  
end
