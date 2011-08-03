require 'test_helper'

class ShareCellTest < Cell::TestCase
  test "hot" do
    invoke :hot
    assert_select "p"
  end
  
  test "order" do
    invoke :order
    assert_select "p"
  end
  

end
