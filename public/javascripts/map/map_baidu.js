   
var MapObject =  {
    map: null, //map对象
    person_id:null,//person id
    home_marker_point:null, //家庭地址 的marker 坐标
    home_city:null,//家庭地址 城市
    home_address: null,//家庭地址 描述
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
    local_search:null,//本地搜索
    infoWindow: new BMap.InfoWindow(),//窗体覆盖物
    file_path: "/system/development",//文件存放路径,
    place_html: null,//新增一个place 的界面样式
    temp_place_marker:null,//临时place marker
    city:null,//当前城市
    localCity:null,//城市服务对象
    
    
    //初始化map
    //person_id: 用户ID
    //container_id: 容器ID
    //is_search_bar: 是否开启搜索条
    //home_marker： 家庭地址坐标,为地图中心点，为空则使用默认的设置
    //level: 默认缩放级别
    initialize: function (person_id,container_id) {
        this.map =  new BMap.Map(container_id);
        this.localCity = new BMap.LocalCity()
        this.get_city()
        this.person_id = person_id;
        this.map.centerAndZoom(this.center, this.zoom_level); 
        if(this.is_enableScrollWheelZoom){
            this.map.enableScrollWheelZoom()    
        }
        if(this.home_marker_point!= null){
            alert(this.home_marker_points)
            MapObject.getLocation(this.home_marker_point, MapObject.show_locaton_infoWindow("home",this.home_marker_point,"/images/map/home.png",34,30));
        }else if(this.home_address!= null){
            MapObject.getPoint(this.home_address, MapObject.add_marker_to_map_function("/images/map/home.png",34,30,"home",this.home_city,true,this.home_address),this.home_city);
        }
        if(this.is_navigationControl!= null){
            this.map.addControl(new BMap.NavigationControl());  
        }
        this.geolocation_function(this.show_my_location_now())  
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map,{});
      
    },
    
    
    get_city:function(){
        this.localCity.get(function(LocalCityResult){
            MapObject.city = LocalCityResult.name
            MapObject.map.centerAndZoom(LocalCityResult.center.point, 13); 
            
        })
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
                MapObject.map.centerAndZoom(geolocationResult.point, 13); 
                MapObject.getLocation(geolocationResult.point, MapObject.show_locaton_infoWindow("location",geolocationResult.point,"/images/map/default.png",57,34));
            }else{
                alert("我当前位置坐标定位失败")
            }

        };
    },
    
    
    //根据反向地理解析显示当前位置描述
    show_locaton_infoWindow:function(marker_type,point,icon_url,icon_w,icon_h){
        return function(result) {
            if(result!= null){
                MapObject.myLocation_address = result.address;
                MapObject.infoWindow.setContent(eval("MapObject."+marker_type+"_html('"+result.address+"')"));
                my_location_marker=  MapObject.add_marker_to_map(point,icon_url,icon_w,icon_h,eval("MapObject."+marker_type+"_html('"+result.address+"')"),true)
                my_location_marker.openInfoWindow(MapObject.infoWindow);
                my_location_marker.addEventListener("click",MapObject.markerClickFunction(eval("MapObject."+marker_type+"_html('"+result.address+"')"),my_location_marker))
            }else{
                alert("定位失败")
            }

        };
    },
    
    
    
    //鼠标点击或悬停mark打开窗体
    markerClickFunction:function(html, marker) {
        return function() {
            marker.openInfoWindow( MapObject.infoWindow);
            MapObject.infoWindow.setContent(html);
            MapObject.infoWindow.redraw()
        };
    } ,
    
    
    //反向地理编码，根据坐标获取描述
    getLocation:function(point,callback_function){
        this.geocoder.getLocation(point, callback_function)
    },
    
    //地理编码，根据描述获取坐标
    getPoint:function(address,callback_function,city){
        this.geocoder.getPoint(address, callback_function,city)
    },
    
    get_local_search:function(c_m_p,key,callback_function){
        this.local_search = new BMap.LocalSearch(c_m_p, {
            onSearchComplete:callback_function
        }); 
        this.local_search.search(key)
    },
    
    //获得我家 的infoWindow 窗体的HTML
    home_html: function(address){
        return "<div>"+address+"</div>"
    },
    //获得当前地点 的infoWindow 窗体的HTML
    location_html: function(address){
        return "<div>"+address+"</div>"
    },
    
    
    //从后台获取数据后初始化marker
    init_marker_from_data:function(type,people_id){
        id_string = ''
        if(people_id !=null && people_id != ''){
            id_string +=("&people_id="+people_id)
        }
        $.ajax({                                                
            type: "GET",                                    
            url: "/markers?type="+type+id_string,
            success: function(data, textStatus){
                eval("MapObject.show_"+type+"("+'data'+")")
            } 
        });
    },
    
    //显示好友位置
    show_friend_position:function(data){
        //        alert(obj2str(data))

        if(data[0].person.photo_file_name!=null){
            pic_url = this.file_path+"/people/photos/"+data[0].person.id + "tn/"+data[0].person.photo_file_name+".jpg"
        }else{
            pic_url = "/images/clean/manoutline.tn.png"
        }
        string_html = "<div> <span><a href='/people/"+data[0].person.id    +
        "'><img alt="+ data[0].person.first_name+" src='"   + pic_url
        +"' title=" +
        data[0].person.first_name+"></a></span><div style='clear:left;'></div></div>"
        alert(string_html)
        point = new BMap.Point(data[0].person.home_longitude, data[0].person.home_latitude)
        this.add_marker_to_map(point,"/images/map/home.png",34,30,string_html,false)
    
    
    },
    
    show_own:function(data){
        alert(data.length)
        for (var i=0;i<=data.length-1;i++) 
        { 
            if(data[i].marker.photo_file_name!=null){
            pic_url = this.file_path+"/pictures/photos/"+data[0].marker.id + "tn/"+data[i].marker.photo_file_name+".jpg";
        }else{
            pic_url = "/images/clean/manoutline.tn.png";
        }
        place_div = $("#place_title span").html("<a href= '#' target='_blank'>");
        string_html = $("#place_info").html();
        point = new BMap.Point(data[i].marker.place_longitude, data[0].marker.place_latitude)
        marker = this.add_marker_to_map(point,"/images/map/default.png",34,30,string_html,false)
        MapObject.markerClusterer.addMarker(marker);
        }
                
        

        
    },
    
    
    
    //在地图添加一个marker
    //point: marker 坐标；
    //icon_url： icon 图片地址；
    //icon_w： 图标 width；
    //icon_h： 图标 height；
    //marker_html： infoWindow
    add_marker_to_map: function(point,icon_url,icon_w,icon_h,marker_html,is_show){
        
        marker = new BMap.Marker(point,{
            icon: this.setIcon(icon_url,icon_w,icon_h)
        });
        this.map.addOverlay(marker);
        if(is_show){
            this.infoWindow.setContent(marker_html)    
            marker.openInfoWindow(MapObject.infoWindow);
        }
        marker.addEventListener("click",MapObject.markerClickFunction(marker_html,marker));
        return marker;
    },
    
    
    //显示我当前位置坐标，使用 Geocoder
    add_marker_to_map_function: function(icon_url,icon_w,icon_h,marker_type,address,is_show,city){
        return function(point) {
            if(point!= null){
                marker = new BMap.Marker(point,{
                    icon: MapObject.setIcon(icon_url,icon_w,icon_h)
                });
                MapObject.map.addOverlay(marker);
                if(is_show){
                    MapObject.infoWindow.setContent(eval("MapObject."+marker_type+"_html('"+address+"')"))    
                    marker.openInfoWindow(MapObject.infoWindow);
                }
                marker.addEventListener("click",MapObject.markerClickFunction(eval("MapObject."+marker_type+"_html('"+address+"')"),marker));
            }else{
                MapObject.get_local_search(city,address,MapObject.add_marker_to_map_local_search_function(icon_url,icon_w,icon_h,marker_type,address,true))
            }
        };
    },
    
    //显示我当前位置坐标，使用local search
    add_marker_to_map_local_search_function: function(icon_url,icon_w,icon_h,marker_type,address,is_show){
        return function(rs) {
            if( MapObject.local_search.getStatus() == BMAP_STATUS_SUCCESS){
                var poi = rs.getPoi(0); 
                marker = new BMap.Marker(poi.point,{
                    icon: MapObject.setIcon(icon_url,icon_w,icon_h)
                });
                MapObject.map.addOverlay(marker);
                if(is_show){
                    MapObject.infoWindow.setContent(eval("MapObject."+marker_type+"_html('"+address+"')"))    
                    marker.openInfoWindow(MapObject.infoWindow);
                }
                marker.addEventListener("click",MapObject.markerClickFunction(eval("MapObject."+marker_type+"_html('"+address+"')"),marker));
            }else{
                alert("查找失败")
            }
        };
    },
    
    
    
    
    //增加地图添加place点事件
    //点击地图 新增一个place 页面
    add_place_to_map_listen:function(){
        function showInfo(e){ 
            MapObject.temp_marker = MapObject.add_marker_to_map(e.point,"/images/map/default.png",57,34,MapObject.place_html,true);
            MapObject.temp_marker.enableDragging()
            MapObject.map.removeEventListener("click", showInfo);  
            MapObject.map.setDefaultCursor("pointer");
            MapObject.getLocation(e.point,
                function(result) {
                    $("#place_location").html(result.address);
                    $("#place_full_address").attr("value",result.address);
                    $("#place_place_latitude").attr("value",e.point.lat);
                    $("#place_place_longitude").attr("value",e.point.lng);
                    $("#place_location").show();
                    MapObject.infoWindow.redraw();
                    MapObject.infoWindow.addEventListener("close", function(){
                        MapObject.map.removeOverlay(MapObject.temp_marker); 
                    });   
                    
                }
                );
        } 
        MapObject.map.addEventListener("click", showInfo);
        MapObject.map.setDefaultCursor("crosshair");
            
    }
    


    
    
    
    
    


   

  
}









