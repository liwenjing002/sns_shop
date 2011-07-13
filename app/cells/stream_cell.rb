class StreamCell < Cell::Rails

  def person_thumbnail
    @stream_item = @opts[:stream_item]
    render
  end

end
