
var MapObject =  {
    map: null,
    markerClusterer: null,
    markers_array: [],
    infoWindow: null,
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
    temp_infowindow: null,
    markers : new Map(),
    info_windows: new Map(), //窗体对象map
    info_windows_html: new Map(),		//窗体的html map					 
    bounds_object: null,				//contains current bounds from markers, polylines etc...
    polygons: [], 						  //contains raw data, array of arrays (first element could be a hash containing options)
    polylines: [], 						  //contains raw data, array of arrays (first element could be a hash containing options)
    circles: [], 
    //初始化map
    initialize: function () {
        var myOptions = {
            zoom: this.map_options.zoom,
            draggableCursor: "default",
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(this.map_options.center_latitude, this.map_options.center_longitude)
        };
        this.map = new google.maps.Map(
            document.getElementById(this.map_options.id), 
            myOptions);
        this.initControl() ;

        this.infoWindow = new google.maps.InfoWindow();
		 
        this.init_marker_from_data();


    },
    
    //控件初始化
    initControl: function () { 
        var ControlDiv = document.createElement('DIV');
        ControlDiv.id = "control_div"
        
        var mark_button = document.createElement('DIV');
        mark_button.id = "mark_button"
        mark_button.title = 'Click to add a marker';
        ControlDiv.appendChild(mark_button);
        var controlText = document.createElement('DIV');
        controlText.class = "control_text";
        controlText.innerHTML = 'add a marker';
        mark_button.appendChild(controlText);
  
        google.maps.event.addDomListener(mark_button, 'click', function() {
            MapObject.add_marker_listen();
        });
        
        var friends_button = document.createElement('DIV');
        friends_button.id = "friends_button"
        friends_button.title = 'look for my friends';
        ControlDiv.appendChild(friends_button);
        var friendsText = document.createElement('DIV');
        friendsText.class = "friends_text";
        friendsText.innerHTML = 'look for my friends';
        friends_button.appendChild(friendsText);
  
        google.maps.event.addDomListener(mark_button, 'click', function() {
            MapObject.add_marker_listen();
        });
        
        //  
        ControlDiv.index = 1;
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(ControlDiv);
    },

    //添加marker 监听
    add_marker_listen:function (){
        google.maps.event.addListenerOnce(MapObject.map, 'click', function(event) {
            MapObject.add_marker(MapObject.map,event.latLng);
        });
    },

    //删除marker 监听
    clear_marker_listen: function (){
        google.maps.event.clearListeners(MapObject.map, 'click');
    },


    //添加一个marker    
    add_marker:function (map,initialLocation){
        this.temp_marker = new google.maps.Marker({
            map:map,
            draggable:false,
            animation: google.maps.Animation.DROP,
            position: initialLocation
        });
        
        // marker_share = document.getElementById("map_infowindow") 
        this.temp_infowindow = MapObject.new_info_window_html(MapObject.map_share_html)
        this.temp_infowindow.open(map,this.temp_marker);
		
		
        google.maps.event.addListenerOnce(this.temp_infowindow, 'closeclick', function(){
            MapObject.temp_marker.setMap(null);   
        });
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
	
	
    
//将实例化的marker和info窗体关联起来
//    add_info_to_marker_from_data: function(marker_id,marker,html,is_temp){
//    alert(marker_id)
//		MapObject.info_windows_html.put(marker_id,html) //存储info窗体的html
//		MapObject.markers.put(marker_id,marker); //储存所有marker
//		//alert(marker_id);
//      	//alert(html)
//        google.maps.event.addListener(marker, 'click', function(e){
//			//alert(html)
//             MapObject.new_info_window(marker_id)
//			//info.open(MapObject.map,marker);
//        });
		
//        if(is_temp == true){
//			if(this.temp_infowindow){
//				this.temp_infowindow.close();
//			}
//           infowindow = MapObject.new_info_window(marker_id);
//		  // infowindow.open(MapObject.map,marker)
//        }

        
//		//alert(marker_id)
//    },
    
//从后台获取数据后初始化marker
init_marker_from_data:function(){
    $.ajax({                                                
        type: "GET",                                    
        url: "/markers",                                      
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
            url: "/markers",                                      
            success: function(message){
                if(message.success){
                    MapObject.markerClusterer.removeMarker(MapObject.markers.get(marker_id));
                    MapObject.infowindow.close();
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
	
updata_data_marker: function(data){
    $.ajax({                                                
        type: "POST",
        data: data,    
        url: "/people/updata_marker",                                      
        success: function(message){

        } 
    });
},

//地址解析方法
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
				
            MapObject.updata_data_marker(data)
        } else {
            alert("none")
        }
    });
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

markerClickFunction:function(html, latlng) {
    return function(e) {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }

        MapObject.infoWindow.setContent(html);
        MapObject.infoWindow.setPosition(latlng);
        MapObject.infoWindow.open(MapObject.map);
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

