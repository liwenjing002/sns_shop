class StreamCell < Cell::Rails
helper  ApplicationHelper
helper  PeopleHelper
  def person_thumbnail

    @stream_item = options[:stream_item]
    render
  end
  
def content
   @stream_item = options[:stream_item]
   @marker = options[:marker]
   @show_on = options[:show_on]
  case  @stream_item.streamable_type
  when "Note"
   render :view=>:note
  when "Album"
    render :view=>:album
  when "Video"
    render :view=>:video
  when "Place"
    render :view => :place
  when "Acticity"
    render :view=>:activity
 end
end

end
