class Address < ActiveRecord::Base

	def to_s
    self.liveing_province + self.liveing_city + self.liveing_address
	end
end
