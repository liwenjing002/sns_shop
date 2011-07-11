require 'test_helper'

class MapCellTest < Cell::TestCase
  test "map" do
    invoke :map
    assert_select "p"
  end
  

end
