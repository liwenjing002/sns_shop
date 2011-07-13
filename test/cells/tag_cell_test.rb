require 'test_helper'

class TagCellTest < Cell::TestCase
  test "tags_with_delete" do
    invoke :tags_with_delete
    assert_select "p"
  end
  
  test "tags" do
    invoke :tags
    assert_select "p"
  end
  

end
