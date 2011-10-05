class ShareCell < Cell::Rails
  helper  ApplicationHelper
   def hot
    @hot_places =Share.find(:all,:conditions=>['shareable_type=?','Place'], :order => "share_order", :limit =>5)
    render
  end
  
  def order
    @order_place =MarkerToMap.find(:all,:conditions=>['marker_type=?','Place'], :order => "count(id)",:group=>"marker_id", :limit =>10)
    render

  end
  
  def pic
  @travel =Share.find(:all,:conditions=>['shareable_type=?','Travel'], :order => "share_order", :limit =>6)
  @scene =Share.find(:all,:conditions=>['shareable_type=?','Scene'], :order => "share_order", :limit =>6)
    render
  end
  
  def video
     @videos=Share.find(:all,:conditions=>['shareable_type=?','Video'], :order => "share_order", :limit =>6)
    render
  end

end
