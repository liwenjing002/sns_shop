require 'test_helper'

class DreamsControllerTest < ActionController::TestCase
  setup do
    @dream = dreams(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dreams)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dream" do
    assert_difference('Dream.count') do
      post :create, :dream => @dream.attributes
    end

    assert_redirected_to dream_path(assigns(:dream))
  end

  test "should show dream" do
    get :show, :id => @dream.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @dream.to_param
    assert_response :success
  end

  test "should update dream" do
    put :update, :id => @dream.to_param, :dream => @dream.attributes
    assert_redirected_to dream_path(assigns(:dream))
  end

  test "should destroy dream" do
    assert_difference('Dream.count', -1) do
      delete :destroy, :id => @dream.to_param
    end

    assert_redirected_to dreams_path
  end
end
