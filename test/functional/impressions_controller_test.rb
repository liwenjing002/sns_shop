require 'test_helper'

class ImpressionsControllerTest < ActionController::TestCase
  setup do
    @impression = impressions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:impressions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create impression" do
    assert_difference('Impression.count') do
      post :create, :impression => @impression.attributes
    end

    assert_redirected_to impression_path(assigns(:impression))
  end

  test "should show impression" do
    get :show, :id => @impression.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @impression.to_param
    assert_response :success
  end

  test "should update impression" do
    put :update, :id => @impression.to_param, :impression => @impression.attributes
    assert_redirected_to impression_path(assigns(:impression))
  end

  test "should destroy impression" do
    assert_difference('Impression.count', -1) do
      delete :destroy, :id => @impression.to_param
    end

    assert_redirected_to impressions_path
  end
end
