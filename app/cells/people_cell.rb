class PeopleCell < Cell::Rails

  def thumbnail

    @person = options[:person]
    render
  end

end
