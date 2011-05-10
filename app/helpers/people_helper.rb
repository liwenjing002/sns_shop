module PeopleHelper
  include StreamsHelper

  def linkify(text, attribute)
    text = h(text)
    text.split(/,\s*/).map do |item|
      link_to item, search_path(attribute => item)
    end
  end

  def attribute(attribute, &block)
    if @person.send(attribute).to_s.any? and @person.show_attribute_to?(attribute, @logged_in)
      capture(&block)
    end
  end
  
  def private(type)
    return true if @person==@logged_in
    @person.privacy_controll(type,@logged_in)
  end
end
