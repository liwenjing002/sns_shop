class ImportDataAddress < ActiveRecord::Migration
  def self.up
    require "iconv"
    suppress(ActiveRecord::StatementInvalid) do
      ActiveRecord::Base.connection.execute 'SET NAMES utf8'
    end  
    string = ''
    file = File.open("#{Rails.root}/public/1.txt")
    file.each_line  do |line|
      string +=line
    end
    file.close
    address_arr = string.split(/\,/)
    proving = nil
    address_arr.each do |address|
      
      if address.split(/\|/)[0][2,4]=='0000'
        proving = Address.create({:father_id =>0,:description=>Iconv.iconv("GB2312//IGNORE","UTF-8//IGNORE",address.split(/\|/)[1])})
        next
      end
      next if address.split(/\|/)[1]=='test'

      Address.create({:father_id=>proving.id,:description=>Iconv.iconv("GB2312//IGNORE","UTF-8//IGNORE",address.split(/\|/)[1])})
    end 
  end

  def self.down
    Address.find_by_sql("delete from addresses")
  end
end
