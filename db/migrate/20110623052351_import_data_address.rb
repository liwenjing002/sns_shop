class ImportDataAddress < ActiveRecord::Migration
  def self.up
    change_column :addresses,:description,:string
    add_column :addresses,:level,:integer
    
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
        pro = Address.create({:father_id =>0,:description=>address.split(/\|/)[1],:level=>1})
        next
      end
      if address.split(/\|/)[0][4,2]=='00'
        if address.split(/\|/)[1] == '市辖区' or address.split(/\|/)[1] == '县' 
          city = pro
          next
        end
        city =  Address.create({:father_id=>pro.id,:description=>address.split(/\|/)[1],:level=>2})
        next 
      end
     
      desc_string = pro.description + city.description + address.split(/\|/)[1] if pro != city
      desc_string = city.description + address.split(/\|/)[1] if pro == city
      Address.create({:father_id=>city.id,:description=>desc_string,:level=>3})
    end 
  end

  def self.down
    remove_column :addresses,:level
  end
end
