require 'test_helper'

class PlaceCellTest < Cell::TestCase
  test "impression" do
    invoke :impression
    assert_select "p"
  end
  
  test "people" do
    invoke :people
    assert_select "p"
  end
  
  test "photo" do
    invoke :photo
    assert_select "p"
  end
  
  test "place_description" do
    invoke :place_description
    assert_select "p"
  end
  
  test "place_message" do
    invoke :place_message
    assert_select "p"
  end
  
  test "place_share_item" do
    invoke :place_share_item
    assert_select "p"
  end
  
  test "place_share_items" do
    invoke :place_share_items
    assert_select "p"
  end
  
  test "share_bar" do
    invoke :share_bar
    assert_select "p"
  end
  

end
