class PeopleCell < Cell::Rails

  def thumbnail
    @person = @opts[:person]
    render
  end

end
