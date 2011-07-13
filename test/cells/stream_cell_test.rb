require 'test_helper'

class StreamCellTest < Cell::TestCase
  test "person_thumbnail" do
    invoke :person_thumbnail
    assert_select "p"
  end
  

end
