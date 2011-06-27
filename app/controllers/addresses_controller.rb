class AddressesController < ApplicationController
   skip_before_filter :authenticate_user

  def search_address
   
    if params[:type] =='simple'
      data = []
        adds = Address.find(:all,:conditions=>["description like  ? and level != 3","%#{params[:key].strip}%"],:include=>[:father],:order=>"level asc" )
        adds.each { |item|
          data.push(item.description) if item.father_id ==0
         if item.father_id !=0
            temp_s = item.description
           temp_s = (item.father.description + temp_s)if item.father
           temp_s = (item.father.father.description+ temp_s) if item.father.father
           data.push(temp_s)
         end
        }
        if adds.length ==1
          adds[0].children.each{|item|  
           temp_s = item.description
           temp_s = (item.father.description + temp_s)if item.father
           temp_s = (item.father.father.description+ temp_s) if item.father.father
           data.push(temp_s)
          }
        end
        
      if adds.length ==0
        adds = Address.find(:all,:conditions=>["description like  ? and level = 3","%#{params[:key].strip}%"],:include=>[:father],:order=>"level asc" )
        adds.each { |item|
          data.push(item.description) if item.father_id ==0
         if item.father_id !=0
            temp_s = item.description
           data.push(temp_s)
         end
        }
      end
       render :json=>{:data=>data}
    end
  end

  def index
    @addresses = Address.find(:all).paginate( :page =>30)
  end

end
