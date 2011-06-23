class ImportDataAddress < ActiveRecord::Migration
  def self.up
    change_column :addresses,:description,:string
    
    string = ''
    file = File.open("#{Rails.root}/public/1.txt")
    file.each_line  do |line|
      string +=line
    end
    file.close
    address_arr = string.split(/\,/)
    pro = nil
    city = nil
    address_arr.each do |address|
      
      if address.split(/\|/)[0][2,4]=='0000'
        pro = Address.create({:father_id =>0,:description=>address.split(/\|/)[1]})
        next
      end
      if address.split(/\|/)[0][4,2]=='00'
        city =  Address.create({:father_id=>pro.id,:description=>address.split(/\|/)[1]})
        next 
      end
     

      Address.create({:father_id=>city.id,:description=>address.split(/\|/)[1]})
    end 
  end

  def self.down
   
  end
end
