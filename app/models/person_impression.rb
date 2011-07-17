class PersonImpression < ActiveRecord::Base
 belongs_to :impression
 belongs_to :person
end
