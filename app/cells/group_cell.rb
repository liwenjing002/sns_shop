class GroupCell < Cell::Rails
  
  def thumbnail
    @group= options[:group]
    render
  end

end
