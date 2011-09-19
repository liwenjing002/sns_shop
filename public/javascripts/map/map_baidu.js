   
var MapObject =  {
    map: null, //map对象
    map_width:null,//地图宽度
    map_heigth:null,//地图高度
    person_id:null,//person id
    home_marker_point:null, //家庭地址 的marker 坐标
    home_city:null,//家庭地址 城市
    home_address: null,//家庭地址 描述
    center: new BMap.Point(116.404, 39.915), //地图中心坐标
    markerClusterer: null, //place markers集合器
    ownClusterer: null, //place own markers集合器
    followClusterer: null, //place own markers集合器
    postitionClusterer: null, //place markers集合器
    shareClusterer: null, //状态 markers集合器
    shareMarkers : new Map(),//状态 marker hash集合
    markers_array: [], //markers数组
    myLocation:null,  //我当前位置的坐标
    my_location_marker: null,//我当前位置marker
    start_marker: null,//起点marker
    end_marker: null,//结束marker
    start_p: null,//起点
    end_p: null,//结束
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
    polyline:new BMap.Polyline(),//折线对象
    
    
    //初始化map
    //person_id: 用户ID
    //container_id: 容器ID
    //is_search_bar: 是否开启搜索条
    //home_marker： 家庭地址坐标,为地图中心点，为空则使用默认的设置
    //level: 默认缩放级别
    initialize: function (person_id,container_id) {
        this.map =  new BMap.Map(container_id);
        this.localCity = new BMap.LocalCity();
        this.infoWindow.disableAutoPan();
        this.get_city();
        this.person_id = person_id;
        this.map.centerAndZoom(this.center, this.zoom_level); 
        this.map_width = $("#mapCanvas").width();
        this.map_heigth = $("#mapCanvas").height();
        if(this.is_enableScrollWheelZoom){
            this.map.enableScrollWheelZoom()    
        }

        if(this.is_navigationControl!= null){
            this.map.addControl(new BMap.NavigationControl());  
        }
        this.geolocation_function(this.show_my_location_now())  
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map,{
            minClusterSize:5,
            maxZoom:13
        });
        this.ownClusterer = this.markerClusterer;
        this.followClusterer = this.markerClusterer;
        this.postitionClusterer = new BMapLib.MarkerClusterer(this.map,{
            minClusterSize:5,
            maxZoom:13
        });
        this.shareClusterer = new BMapLib.MarkerClusterer(this.map,{
            minClusterSize:5,
            maxZoom:13
        });
        this.map.addEventListener("moveend",this.move_zoom_drag_chang());
        this.map.addEventListener("zoomend",this.move_zoom_drag_chang());
        this.map.addEventListener("dragend",this.move_zoom_drag_chang())
      
    },
    
    
    get_city:function(){
        this.localCity.get(function(LocalCityResult){
            MapObject.city = LocalCityResult.name
            MapObject.map.centerAndZoom(LocalCityResult.center.point, 13); 
            if(MapObject.home_address!= null){
                MapObject.getPoint(MapObject.home_address, MapObject.add_marker_to_map_function("/images/map/home.png",34,30,"home",null,MapObject.home_address,true,null,MapObject.city),MapObject.city);
            }
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
                MapObject.myLocation = geolocationResult.point;
                MapObject.getLocation(geolocationResult.point, MapObject.show_locaton_infoWindow("location",null,geolocationResult.point,"/images/map/default.png",57,34));

            }else{
                alert("我当前位置坐标定位失败")
            }

        };
    },
    
    
    //根据反向地理解析显示当前位置描述
    show_locaton_infoWindow:function(marker_type,dom,point,icon_url,icon_w,icon_h){
        return function(result) {
            if(result!= null){
                MapObject.myLocation_address = result.address;
                MapObject.start_p = result.address;
                MapObject.infoWindow.setContent(eval("MapObject."+marker_type+"_html('"+result.address+"')"));
                MapObject.my_location_marker=  MapObject.add_marker_to_map(point,icon_url,icon_w,icon_h,eval("MapObject."+marker_type+"_html('"+result.address+"'"+ ",dom)"),"my_location",null,true)
                MapObject.my_location_marker.openInfoWindow(MapObject.infoWindow);
                MapObject.my_location_marker.addEventListener("click",MapObject.markerClickFunction(eval("MapObject."+marker_type+"_html('"+result.address+"'"+ ",dom)"),MapObject.my_location_marker))
                data = "postition[current_latitude]="+point.lat+"&postition[current_longitude]="+point.lng
                +"&postition[person_id]="+MapObject.person_id+"&postition[current_address]="+result.address
                url = "/location/postitions";
                request_type = "POST";
                MapObject.update_date_to_service(data, request_type, url, function(){})
            }else{
                alert("定位失败")
            }

        };
    },
    
    
    
    //鼠标点击或悬停mark打开窗体
    markerClickFunction:function(html, marker) {
        return function() {
            MapObject.infoWindow.setContent(html);
            marker.openInfoWindow(MapObject.infoWindow);
            
        //            MapObject.infoWindow.redraw()
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
    home_html: function(address,dom){
        return "<div>"+address+"</div>"
    },
    //获得当前地点 的infoWindow 窗体的HTML
    location_html: function(address,dom){
        return "<div>"+address+"</div>"
    },
    
    share_html:function(address,dom){
        return dom
    },
    //我要去的html
    go_to_html:function(address,dom){
        return "<div id='start_p'>去："+address+"<span class='button' onclick='MapObject.go_with_bus()' >公交</span>\n\
                <span class='button' onclick='MapObject.go_with_car()' >驾车</span></div>"
    },
    
    
    //从后台获取数据后初始化marker
    init_marker_from_data:function(type,people_id,data){
        id_string = ''
        if(people_id !=null && people_id != ''){
            id_string +=("&people_id="+people_id)
        }
        $.ajax({                                                
            type: "GET",                                    
            url: "/markers?type="+type+id_string,
            data:data,
            success: function(data, textStatus){
                MapObject.markerClusterer.clearMarkers()
                eval("MapObject.show_"+type+"("+'data'+")")
            } 
        });
    },
    
    update_date_to_service:function(data,request_type,url,call_function){
        $.ajax({                                                
            type: request_type,                                    
            url: url,
            data:data,
            success: call_function
        });
    },
    
    //显示好友位置
    show_friend_position:function(data){
        for (var i=0;i<=data.length-1;i++) 
        {
            if(data[i].longitude =='' && data[i].latitude ==''){
                MapObject.getPoint(data[0].geocode_position, MapObject.add_marker_to_map_function("/images/map/default.png",34,30,"streamable",data[i].html,this.map,null,true,data[i].marker_id,data[i].geocode_position),this.map);
            }else{
                point = new BMap.Point(data[i].longitude, data[i].latitude)
                marker = this.add_marker_to_map(point,"/images/map/default.png",34,30,data[i].html,"friend_postition",false)
                MapObject.markerClusterer.addMarker(marker); 
            }

        }
    
    },
    
    show_own:function(data){
        MapObject.ownClusterer.clearMarkers();
        point_array = []
        for (var i=0;i<=data.length-1;i++) 
        {
            if(data[i].longitude !='' && data[i].latitude !=''){
                point = new BMap.Point(data[i].longitude, data[i].latitude)
                point_array[i] = point
                marker = this.add_marker_to_map(point,"/images/map/default.png",34,30,data[i].html,"own",false)
                MapObject.ownClusterer.addMarker(marker); 
            }

        }
    },
    
    show_follow:function(data){
        this.show_own(data)
    },
    
    show_share:function(data){
        MapObject.shareClusterer.clearMarkers();
        for (var i=0;i<=data.length-1;i++) 
        {
            if(data[i].longitude =='' && data[i].latitude ==''){
                MapObject.getPoint(data[0].geocode_position, MapObject.add_marker_to_map_function("/images/map/default.png",34,30,"share",data[i].html,this.map,null,true,data[i].marker_id,data[i].geocode_position),this.map);
            }else{
                point = new BMap.Point(data[i].longitude, data[i].latitude)
                marker = this.add_marker_to_map(point,"/images/map/default.png",34,30,data[i].html,"share",false)
                MapObject.shareClusterer.addMarker(marker); 
            }

        }
    },
    
    show_locus:function(data){
        MapObject.map.clearOverlays(MapObject.my_location_marker)
        MapObject.postitionClusterer.clearMarkers();
        point_array = []
        for (var i=0;i<=data.length-1;i++) 
        {
            if(data[i].longitude !='' && data[i].latitude !=''){
                point = new BMap.Point(data[i].longitude, data[i].latitude)
                point_array[i] = point
                marker = this.add_marker_to_map(point,"/images/map/default.png",34,30,data[i].html,"locus",data[i].marker_id,false)
                MapObject.postitionClusterer.addMarker(marker); 
            }

        }
        this.polyline.setPath(point_array);
        this.polyline.enableEditing()
        MapObject.map.addOverlay(this.polyline);  
    },
    
    //显示公交线路
    go_with_bus:function(){
        var transit = new BMap.TransitRoute(this.map);
        if (this.my_location_marker){
            this.start_point = this.my_location_marker.getPosition();
        }else{
            this.start_point = this.map.getCenter();
        }
        
        transit.setSearchCompleteCallback(function(results){  
            if (transit.getStatus() == BMAP_STATUS_SUCCESS){  
                var firstPlan = results.getPlan(0);  
                // 绘制步行线路  
                for (var i = 0; i < firstPlan.getNumRoutes(); i ++){  
                    var walk = firstPlan.getRoute(i);  
                    if (walk.getDistance(false) > 0){  
                        // 步行线路有可能为0  
                        MapObject.map.addOverlay(new BMap.Polyline(walk.getPath(), {
                            lineColor: "green"
                        }));  
                    }  
                }  
                // 绘制公交线路  
                for (i = 0; i < firstPlan.getNumLines(); i ++){  
                    var line = firstPlan.getLine(i);  
                    MapObject.map.addOverlay(new BMap.Polyline(line.getPath()));  
                }
            }
        });     
        transit.search(this.start_point, this.end_marker.getPosition()); 
    },
    //显示驾车路线
    go_with_car:function(){
        
    },
    
    
    //在地图添加一个marker
    //point: marker 坐标；
    //icon_url： icon 图片地址；
    //icon_w： 图标 width；
    //icon_h： 图标 height；
    //marker_html： infoWindow
    add_marker_to_map: function(point,icon_url,icon_w,icon_h,marker_html,marker_type,marker_id,is_show){
       
        marker = new BMap.Marker(point,{
            icon: this.setIcon(icon_url,icon_w,icon_h)
        });
        this.map.addOverlay(marker);
        if(is_show){
            MapObject.infoWindow.setContent(marker_html);
            //            MapObject.infoWindow.redraw()
            marker.openInfoWindow(MapObject.infoWindow);
        }
        if(eval("this."+marker_type+"Clusterer")){
            eval("this."+marker_type+"Clusterer").addMarker(marker);
        }
        if(eval("this."+marker_type+"Markers")){
            if(marker_id){
                eval("this."+marker_type+"Markers").put(marker_id,marker);   
            }
        }


        marker.addEventListener("click",MapObject.markerClickFunction(marker_html,marker));
        return marker;
    },
    
    
    //显示我当前位置坐标，使用 Geocoder
    add_marker_to_map_function: function(icon_url,icon_w,icon_h,marker_type,dom_html,address,is_show,marker_id,city){
        return function(point) {
            if(point!= null){
                marker = new BMap.Marker(point,{
                    icon: MapObject.setIcon(icon_url,icon_w,icon_h)
                });
                MapObject.map.addOverlay(marker);
                if(is_show){
                    MapObject.infoWindow.setContent(eval("MapObject."+marker_type+"_html('"+address+"',dom_html)"))    
                    marker.openInfoWindow(MapObject.infoWindow);
                }
                marker.addEventListener("click",MapObject.markerClickFunction(eval("MapObject."+marker_type+"_html('"+address+"',dom_html)"),marker));
                if(eval("MapObject."+marker_type+"Clusterer")){
                    eval("MapObject."+marker_type+"Clusterer").addMarker(marker);
                }
                if(eval("MapObject."+marker_type+"Markers")){
                    if(marker_id){
                        eval("MapObject."+marker_type+"Markers").put(marker_id,marker);  
                    }
                }
                if(marker_id){
                    data = "marker[marker_latitude]="+point.lat+"&marker[marker_longitude]="+point.lng
                    request_type = "PUT";
                    url = "/markers/"+marker_id
                    MapObject.update_date_to_service(data, request_type, url, function(){})
                }
            }else{
                MapObject.get_local_search(city,address,MapObject.add_marker_to_map_local_search_function(icon_url,icon_w,icon_h,marker_type,dom_html,marker_id,address,true))
            }
        };
    },
    
    //显示我当前位置坐标，使用local search
    add_marker_to_map_local_search_function: function(icon_url,icon_w,icon_h,marker_type,dom_html,marker_id,address,is_show){
        return function(rs) {
            if( MapObject.local_search.getStatus() == BMAP_STATUS_SUCCESS){
                var poi = rs.getPoi(0); 
                marker = new BMap.Marker(poi.point,{
                    icon: MapObject.setIcon(icon_url,icon_w,icon_h)
                });
                MapObject.map.addOverlay(marker);
                if(is_show){
                    MapObject.infoWindow.setContent(eval("MapObject."+marker_type+"_html('"+address+"',dom_html)"))    
                    marker.openInfoWindow(MapObject.infoWindow);
                }
                marker.addEventListener("click",MapObject.markerClickFunction(eval("MapObject."+marker_type+"_html('"+address+"',dom_html)"),marker));
                if(marker_id){
                    data = "marker[marker_latitude]="+poi.point.lat+"&marker[marker_longitude]="+poi.point.lng
                    request_type = "PUT";
                    url = "/markers/"+marker_id
                    MapObject.update_date_to_service(data, request_type, url, function(){})
                }
            }else{
                alert("查找失败")
            }
        };
    },
    
    
    
    
    //增加地图添加place点事件
    //点击地图 新增一个place 页面
    add_place_to_map_listen:function(){
        function showInfo(e){ 
            MapObject.temp_marker = MapObject.add_marker_to_map(e.point,"/images/map/default.png",57,34,MapObject.place_html,"temp_place",null,true);
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
            
    },
    marker_move: function(marker_type,marker_id){
        alert(marker_type)
        marker = eval("MapObject."+marker_type+"Markers").get(marker_id)
        alert(marker)
        marker.enableDragging()
    },
    //地图移动或者缩放或者拖拽的时候，获得边界坐标，并向后台请求数据
    move_zoom_drag_chang:function(){
        return function fun(e){ 
            cent = MapObject.map.getCenter();
            left_top = MapObject.map.pixelToPoint(new BMap.Pixel(0,0))
            right_down = MapObject.map.pixelToPoint(new BMap.Pixel(MapObject.map_width,MapObject.map_heigth))
            data = "marker[marker_latitude_lt]="+left_top.lat+"&marker[marker_latitude_gt]="+right_down.lat +
            "&marker[marker_longitude_gt]="+left_top.lng+"&marker[marker_longitude_lt]="+right_down.lng
            MapObject.init_marker_from_data("share", MapObject.person_id, data); 
        }
    },
    
    //我要去
    i_go_to:function(){
        function show_go_to(e){
            MapObject.getLocation(e.point, function(result){
                MapObject.end_marker = new BMap.Marker(e.point,{
                    icon: MapObject.setIcon("/images/map/default.png",57,34)
                });
                MapObject.map.removeEventListener("click", show_go_to);  
                MapObject.map.addOverlay(MapObject.end_marker);
                MapObject.end_p = result.address
                now_html = eval("MapObject."+"go_to"+"_html('"+result.address+"',null)")
                MapObject.infoWindow.setContent(now_html)    
                MapObject.end_marker.openInfoWindow(MapObject.infoWindow);
                MapObject.end_marker.addEventListener("click",MapObject.markerClickFunction(now_html, MapObject.end_marker));  
            }) ;
        }
        this.map.addEventListener("click",show_go_to);
    }
    

	
    


    
    
    
    
    


   

  
}









