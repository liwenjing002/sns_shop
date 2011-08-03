class MarkerToMap < ActiveRecord::Base
  belongs_to :map
  belongs_to :marker
  belongs_to :object, :polymorphic => true
  acts_as_taggable
end
