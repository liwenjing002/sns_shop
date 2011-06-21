   
var MapObject =  {
    map: null,
    home_marker:null,
    markerClusterer: null,
    markers_array: [],
    infoWindow: new google.maps.InfoWindow(),
    geocoder: new google.maps.Geocoder(),//地址解析对象
    map_share_html:null,	//新增一个marker的初始化html
    visibleInfoWindow: null,
    map_options: {
        id: 'mapCanvas',
        type: "ROADMAP",        // HYBRID, ROADMAP, SATELLITE, TERRAIN
        center_latitude : 34.524661, //默认将中心定于中国
        center_longitude : 103.886719, 
        zoom : 4,
        auto_adjust : false,    //adjust the map to the markers if set to true
        auto_zoom: true,        //zoom given by auto-adjust
        bounds: []              //adjust map to these limits. Should be [{"lat": , "lng": }]
    },
    temp_marker:null,
    temp_infowindow: new google.maps.InfoWindow(),
    markers : new Map(),
    info_windows: new Map(), //窗体对象map
    info_windows_html: new Map(),		//窗体的html map					 
    bounds_object: null,				//contains current bounds from markers, polylines etc...
    polygons: [], 						  //contains raw data, array of arrays (first element could be a hash containing options)
    polylines: [], 						  //contains raw data, array of arrays (first element could be a hash containing options)
    circles: [], 
    //初始化map
    initialize: function (id) {
        var myOptions = {
            zoom: this.map_options.zoom,
            draggableCursor: "default",
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(this.map_options.center_latitude, this.map_options.center_longitude)
        };
        this.map = new google.maps.Map(
            document.getElementById(this.map_options.id), 
            myOptions);

        this.init_marker_from_data("my_home",id);



    },
    
    //控件初始化
    initControl: function () { 
      
    },

    //添加marker 监听
    add_marker_listen:function (){
        google.maps.event.addListenerOnce(MapObject.map, 'click', function(event) {
            MapObject.add_marker(MapObject.map,event.latLng);
        });
         google.maps.event.addListener(MapObject.map, 'mousemove', function(event) {
           MapObject.map.setOptions({ draggableCursor: 'crosshair' });
      });
           google.maps.event.addListener(MapObject.map, 'rightclick', function(event) {
           MapObject.clear_marker_listen();
      });
    },

    //删除marker 监听
    clear_marker_listen: function (){
        google.maps.event.clearListeners(MapObject.map, 'click');
        google.maps.event.clearListeners(MapObject.map, 'mousemove')
         MapObject.map.setOptions({ draggableCursor: 'default' });
    },


    //添加一个marker    
    add_marker:function (map,initialLocation){
        //alert(1)
        this.temp_marker = new google.maps.Marker({
            map:map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            position: initialLocation
        });
        
        MapObject.geocoder.geocode({
            latLng: initialLocation
        }, function(responses){
            MapObject.new_marker_Function(responses)
        });
        google.maps.event.clearListeners(MapObject.map, 'mousemove')
         MapObject.map.setOptions({ draggableCursor: 'default' });

    },
    //new marker请求地址解析的回调函数
    new_marker_Function:function (responses) {
        string = MapObject.split_responses_address(responses);
        
        postition_html = "<div id='new_postition' style='min-height:200px;height:auto;'><div id ='postition_text'><span color: #5F9128>当前位置：</span>"+string +"</div>"
        MapObject.temp_infowindow.setContent(postition_html + MapObject.map_share_html+"</div>")
        MapObject.temp_infowindow.open(MapObject.map,MapObject.temp_marker);
         google.maps.event.addListener(MapObject.temp_infowindow, 'domready', function(){
        $("#place_full_address").attr("value",string);
        $("#place_place_latitude").attr("value",MapObject.temp_marker.getPosition().lat());
        $("#place_place_longitude").attr("value",MapObject.temp_marker.getPosition().lng());
         })
        
        google.maps.event.addListenerOnce(MapObject.temp_infowindow, 'closeclick', function(){
            MapObject.temp_marker.setMap(null)
        });
        google.maps.event.addListener(MapObject.temp_marker, 'dragend', function(){
            MapObject.geocoder.geocode({
                latLng: MapObject.temp_marker.getPosition()
            }, function(responses){
                string = MapObject.split_responses_address(responses);
                //alert(string)
                $("#postition_text").html("<span color: #5F9128>当前位置：</span>"+string );
                $("#place_full_address").attr("value",string)
                $("#place_place_latitude").attr("value",MapObject.temp_marker.getPosition().lat())
                $("#place_place_longitude").attr("value",MapObject.temp_marker.getPosition().lng())
            });
        });
			
    },


    split_responses_address:function(responses){
        if (responses && responses.length > 0) {
            //MapObject.updateMarkerAddress(marker_id,responses);
            string = '';
            for(i = responses[0].address_components.length-1;i>=0;i--){
                string += (responses[0].address_components[i].long_name+ "|")
            }
            return string;
        }else{
            return //"找不到该地址"
        }
    },
			

    //跳动动画效果
    toggleBounce: function (marker) {
      
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    },


    //定位
    set_current_position: function (){
        // Try W3C Geolocation (Preferred)
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                map.setCenter(initialLocation);
                add_marker(initialLocation)
            }, function() {
                handleNoGeolocation(browserSupportFlag);
            },{
                enableHighAccuracy:true, 
                maximumAge:30000, 
                timeout:3000
            });
        // Try Google Gears Geolocation
        } else if (google.gears) {
            browserSupportFlag = true;
            var geo = google.gears.factory.create('beta.geolocation');
            geo.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
                map.setCenter(initialLocation);
                add_marker(initialLocation)
            }, function() {
                handleNoGeoLocation(browserSupportFlag);
            });
        // Browser do not support Geolocation
        } else {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        }
    },


    handleNoGeolocation: function (errorFlag) {
        if (errorFlag == true) {
            alert("定位服务失败，我们将您定位在中国，请您手动选择您的位置");
            initialLocation = newyork;
        } else {
            alert("您拒绝定位服务，我们将您定位在中国，请您手动选择您的位置");
            initialLocation = siberia;
        }
        map.setCenter(initialLocation);
        map.setZoom(4);
    },
    

    //提交marker信息到后台
    submit_marker: function(type){
        var markerLatLng = MapObject.temp_marker.getPosition()
        alert(type)
        MapObject.geocoder.geocode({
            latLng: markerLatLng
        }, 
        function(responses) {
            if (responses && responses.length > 0) {
                string = '';
                for(i = responses[0].address_components.length-1;i>=0;i--){
                    string += (responses[0].address_components[i].long_name+ "|")
                }
                if(type == 'notes'){
                    $.ajax({                                                
                        type: "POST",                                    
                        url: "/notes",                                     
                        data: "marker[geocode_position]="+ string +"&note[body]="+ $("#note_body").val()+ "&ajax=true"+ "&marker[marker_latitude]=" +markerLatLng.lat()+ "&marker[marker_longitude]=" +markerLatLng.lng(),    
                        success: function(message){                 
                        } 
                    });  
                }

                if(type == 'place'){
//                    $.ajax({                                                
//                        type: "POST",                                    
//                        url: "/places",                                     
//                        data: "marker[geocode_position]="+ $("#place_full_address") .attr("value")+ 
//                               "&marker[marker_latitude]=" + $("#place_place_latitude").attr("value")+ 
//                               "&marker[marker_longitude]=" + $("#place_place_longitude").attr("value")+
//                                "&place[place_name]="+ $("#place_place_name").val()+ 
//                                "&place[full_address]="+ $("#place_full_address").val()+ 
//                                "&place[place_description]="+ $("#place_place_description").val()+"&ajax=true",    
//                        success: function(message){                 
//                        } 
//                    });  
                                    
                    $("#place_full_address").attr("value",string)
		    $("#place_place_latitude").attr("value",markerLatLng.lat())
		    $("#place_place_longitude").attr("value",markerLatLng.lng())

                }
            }
        }
        );

    },

    //实例化一个窗体对象，实例化所需的html 从 map 中获取
    new_info_window:function(marker_id){
        //alert(marker_id);
        //alert(MapObject.markers.get(marker_id))
        infowindow = null;
        //alert(MapObject.info_windows.get(marker_id))
        if (!MapObject.info_windows.get(marker_id)){
            infowindow = new google.maps.InfoWindow({
                content: MapObject.info_windows_html.get(marker_id),
                disableAutoPan:false
            });
            MapObject.info_windows.put(marker_id,infowindow)
            //alert(MapObject.markers.get(marker_id))
            infowindow.open(MapObject.map,MapObject.markers.get(marker_id))
            google.maps.event.addListener(infowindow, 'closeclick', function(){
                //alert(marker_id)
                //alert(MapObject.info_windows.get(marker_id));
                MapObject.info_windows.remove(marker_id);
            });
        }
        return infowindow;

    },

    //实例化一个窗体对象，实例化所需的html直接传入
    new_info_window_html:function(html){
        infowindow = new google.maps.InfoWindow({
            content: html,
            disableAutoPan:false
        });
        return infowindow;

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
            success: function(){
            } 
        });
    },
    
    
    
	
    marker_del:function(marker_id){
        //alert(MapObject.markers.get(marker_id))
        var bln=confirm("真的要删除该标记")
        if (bln==true)
        {
            $.ajax({                                                
                type: "DELETE",
                data: "id="+marker_id,
                url: "/markers/"+marker_id,                                      
                success: function(message){
                    if(message.success){
                        MapObject.infoWindow.close();
                        MapObject.markerClusterer.removeMarker(MapObject.markers.get(marker_id));
                    }else{
                        alert("网络延迟，请重试")
                    }
                    
                } 
            });
            
        }
                
    },
    marker_move: function(marker_id){
        //alert(marker_id)
        marker = MapObject.markers.get(marker_id);
        //alert(marker);
        marker.setDraggable(true);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        google.maps.event.addListenerOnce(marker, 'dragend', function(){
            marker.setDraggable(false);
            markerLatLng = marker.getPosition();
            //alert(markerLatLng);
            MapObject.infoWindow.close();
            google.maps.event.clearListeners(marker, 'click')
            MapObject.geocodePosition(marker_id,markerLatLng)
        });
    } ,
	
    updata_data_marker: function(data,id){
        $.ajax({                                                
            type: "PUT",
            data: data,    
            url: "/markers/"+id,                                      
            success: function(message){

            } 
        });
    },

    //反向地址解析方法
    geocodePosition:function (marker_id,markerLatLng) {
        MapObject.geocoder.geocode({
            latLng: markerLatLng
        }, function(responses) {
            if (responses && responses.length > 0) {

                //MapObject.updateMarkerAddress(marker_id,responses);
                string = '';
                for(i = responses[0].address_components.length-1;i>=0;i--){
                    string += (responses[0].address_components[i].long_name+ "|")
                }
                //alert("1 "+ string)
                data = "marker[id]="+marker_id+ "&marker[geocode_position]="+ string +"&marker[marker_latitude]=" +markerLatLng.lat()+ "&marker[marker_longitude]=" +markerLatLng.lng(),  
				
                MapObject.updata_data_marker(data,marker_id)
            } else {
                alert("none")
            }
        });
    },


    //地址解析方法
    re_geocodePosition:function (address,icon,info_htm,is_home) {
        MapObject.geocoder.geocode({
            address: address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //alert(results[0].geometry.location)
                MapObject.geocodePosition_marker(results[0].geometry.location,icon,info_htm,is_home)
            } else {
               // alert("找不到这个地方");
            }
        });
    },


    geocodePosition_marker:function(latLng,icon,info_htm,is_home){
        marker = new google.maps.Marker({
            map: MapObject.map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            icon: icon,
            position: latLng
        });
        //alert(info_htm)
        if (info_htm!= null){
            var fn = MapObject.markerClickFunction(info_htm, marker);
             google.maps.event.addListener(marker, 'mouseover', fn);
        }
        if(is_home){
            MapObject.home_marker = marker;
            
            return;
        }else{
            MapObject.markerClusterer.addMarker(marker,true);
        }
      
    //alert(results[0].geometry.location)
    },



    //根据google返回的数据更新info_window
    updateMarkerAddress:function(marker_id,responses){
        marker_address = $("#stream_item_"+marker_id+" .marker_address")
        for(i = responses[0].address_components.length-1;i>=0;i--){
            string = responses[0].address_components[i].long_name
            //alert(string)
            $("<span><a>"+ string +"</a></span>").appendTo(marker_address)
        }
    },

    //鼠标点击或悬停mark打开窗体
    markerClickFunction:function(html, marker) {
        return function(e) {
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            //alert(marker)
            MapObject.infoWindow.setContent(html);
            //MapObject.infoWindow.setPosition(latlng);
            MapObject.infoWindow.open(MapObject.map,marker);
        };
    }  ,
    //鼠标离开mark关闭窗体
    markerCloseFunction:function() {
        return function(e) {
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            //alert(marker)
            MapObject.infoWindow.close();

        };
    }
       
    
  
}





function obj2str(o){
    var r = [];
    if(typeof o == "string" || o == null) {
        return o;
    }
    if(typeof o == "object"){
        if(!o.sort){
            r[0]="{"
            for(var i in o){
                r[r.length]=i;
                r[r.length]=":";
                r[r.length]=obj2str(o[i]);
                r[r.length]=",";
            }
            r[r.length-1]="}"
        }else{
            r[0]="["
            for(var i =0;i<o.length;i++){
                r[r.length]=obj2str(o[i]);
                r[r.length]=",";
            }
            r[r.length-1]="]"
        }
        return r.join("");
    }
    return o.toString();
}



