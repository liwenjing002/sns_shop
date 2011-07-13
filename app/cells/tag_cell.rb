class TagCell < Cell::Rails

  def tags_with_delete
    @object = @opts[:object]
    render
  end

  def tags
    @object = @opts[:object]
    render
  end

end
