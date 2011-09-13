   
var MapObject =  {
    map: null, //map对象
    person_id:null,//person id
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
    file_path: "/system/development",//文件存放路径
    
    
    //初始化map
    //person_id: 用户ID
    //container_id: 容器ID
    //is_search_bar: 是否开启搜索条
    //home_marker： 家庭地址坐标,为地图中心点，为空则使用默认的设置
    //level: 默认缩放级别
    initialize: function (person_id,container_id) {
        this.map =  new BMap.Map(container_id);
        this.person_id = person_id
        this.map.centerAndZoom(this.center, this.zoom_level); 
        if(this.is_enableScrollWheelZoom){
            this.map.enableScrollWheelZoom()    
        }
        if(this.home_marker_point!= null){
            MapObject.getLocation(this.home_marker_point, MapObject.show_locaton_infoWindow("home",this.home_marker_point,"/images/map/home.png",34,30));
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
                MapObject.map.centerAndZoom(geolocationResult.point, 17); 
                MapObject.getLocation(geolocationResult.point, MapObject.show_locaton_infoWindow("location",geolocationResult.point,"/images/map/default.png",57,34));
            }else{
                alert("定位失败")
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
                //                alert(textStatus)
                //                                alert(obj2str(data))
                eval("MapObject.show_"+type+"("+'data'+")")
            } 
        });
    },
    
    //显示好友位置
    show_friend_position:function(data){
        string_html = "<div> <span><a href='/people/"+data[0].person.id    +
        "'><img alt="+ data[0].person.first_name+" src="   + 
        this.file_path+"/people/photos/"+data[0].person.id +
        "tn/"+data[0].person.photo_file_name+".jpg title=" +
        data[0].person.first_name+"></a></span><div style='clear:left;'></div></div>"

        
        alert(string_html)
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
    
    
    //增加地图添加place点事件
    //点击地图 新增一个place 页面
    add_place_to_map_listen:function(){
        function showInfo(e){ 
           
            MapObject.add_marker_to_map(e.point,"/images/map/default.png",57,34,document.getElementById("map_infowindow").innerHTML,true);
            MapObject.map.removeEventListener("click", showInfo);  
        } 
        this.map.addEventListener("click", showInfo)
            
    }
    


    
    
    
    
    


   

  
}









