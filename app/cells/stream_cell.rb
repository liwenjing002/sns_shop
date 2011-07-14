class StreamCell < Cell::Rails

  def person_thumbnail

    @stream_item = options[:stream_item]
    render
  end

end
