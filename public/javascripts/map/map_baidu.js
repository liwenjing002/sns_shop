   
var MapObject =  {
    map: null, //map对象
    home_marker_point:null, //家庭地址 的marker 坐标
    center: new BMap.Point(116.404, 39.915), //地图中心坐标
    markerClusterer: null, //markers集合器
    markers_array: [], //markers数组
    myLocation:null,  //我当前位置的坐标
    my_location_marker: null,//我当前位置marker
    myLocation_address:null,//我当前位置的文字描述 
    is_enableScrollWheelZoom:true,//启用滚轮放大缩小，默认开启
    zoom_level:10,//默认缩放级别
    is_serach_bar:false,//是否开启搜索条
    is_navigationControl: true, //是否开启标准控件
    geolocation: new BMap.Geolocation(),//定位对象
    geocoder: new BMap.Geocoder(),// 创建地理编码实例 
    infoWindow: new BMap.InfoWindow(),//窗体覆盖物
    
    
    //初始化map
    //person_id: 用户ID
    //container_id: 容器ID
    //is_search_bar: 是否开启搜索条
    //home_marker： 家庭地址坐标,为地图中心点，为空则使用默认的设置
    //level: 默认缩放级别
    initialize: function (person_id,container_id) {
        this.map =  new BMap.Map(container_id);
        if(home_marker!=null){
            this.home_marker = home_marker
        }
        this.map.centerAndZoom(this.center, this.zoom_level); 
        if(this.is_enableScrollWheelZoom){
            this.map.enableScrollWheelZoom()    
        }
        if(this.home_marker_point!= null){
            var home_marker = new BMap.Marker(this.home_marker_point,{
                icon: this.setIcon("/images/map/home.png",34,30)
                });        // 创建家庭标注  
            this.map.addOverlay(home_marker);
            MapObject.getLocation(this.home_marker_point, MapObject.show_locaton_infoWindow(home_marker));
            this.map.centerAndZoom(this.home_marker_point, this.zoom_level); 
        }
        if(this.is_navigationControl!= null){
            this.map.addControl(new BMap.NavigationControl());  
        }
        this.geolocation_function(this.show_my_location_now())  
      
    },
    
    //设置marker 图标
    setIcon:function(image_url,s_width,s_height){
        var myIcon = new BMap.Icon(image_url, new BMap.Size(s_width, s_height)); 
        return myIcon;
    },
    //地图定位
    geolocation_function: function(callback_function){
        this.geolocation.getCurrentPosition(callback_function,{
            enableHighAccuracy:false,
            timeout:1000
        })
    },
    
    //显示我当前位置坐标
    show_my_location_now: function(){
        return function(geolocationResult) {
            if(geolocationResult!= null){
                MapObject.myLocation = geolocationResult.point
                MapObject.my_location_marker = new BMap.Marker(geolocationResult.point,{
                    icon: MapObject.setIcon("/images/map/default.png",57,34)
                    });        // 创建我的位置标注  
                MapObject.map.addOverlay(MapObject.my_location_marker);
                MapObject.map.centerAndZoom(geolocationResult.point, 17); 
                MapObject.getLocation(geolocationResult.point, MapObject.show_locaton_infoWindow(MapObject.my_location_marker));
            }else{
                alert("定位失败")
            }

        };
    },
    
    
    //根据反向地理解析显示当前位置描述
    show_locaton_infoWindow:function(my_location_marker){
         return function(result) {
            if(result!= null){
                MapObject.myLocation_address = result.address;
                MapObject.infoWindow.setContent("<div>"+result.address+"</div>");
                my_location_marker.openInfoWindow(MapObject.infoWindow);
                my_location_marker.addEventListener("click",MapObject.markerClickFunction("<div>"+result.address+"</div>",my_location_marker))
            }else{
                alert("定位失败")
            }

        };
    },
    
    
    
     //鼠标点击或悬停mark打开窗体
    markerClickFunction:function(html, marker) {
        return function(e) {
            marker.openInfoWindow( MapObject.infoWindow);
            MapObject.infoWindow.setContent(html);
            MapObject.infoWindow.redraw()
        };
    } ,
    
    
    //反向地理编码，根据坐标获取描述
    getLocation:function(point,callback_function){
        this.geocoder.getLocation(point, callback_function)
    },
    
    //获得我家 的infoWindow 窗体的HTML
    get_my_home_html: function(){
        
    }
    
    


    
    
    
    
    


   

  
}









