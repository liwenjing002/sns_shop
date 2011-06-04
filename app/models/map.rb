class Map < ActiveRecord::Base
  belongs_to :person
  has_many :marker_to_maps
  has_many :markers, :through => :marker_to_maps
end
