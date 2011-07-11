require 'test_helper'

class CommonCellTest < Cell::TestCase
  test "marker_info" do
    invoke :marker_info
    assert_select "p"
  end
  
  test "menus" do
    invoke :menus
    assert_select "p"
  end
  
  test "new_place" do
    invoke :new_place
    assert_select "p"
  end
  
  test "place_info" do
    invoke :place_info
    assert_select "p"
  end
  
  test "share" do
    invoke :share
    assert_select "p"
  end
  

end
