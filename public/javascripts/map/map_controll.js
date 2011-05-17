
var MapObject =  {
    map: null,
    map_share_html:null,									//contains the map we're working on
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
    markers : [],							  //contains all markers. A marker contains the following: {"description": , "longitude": , "title":, "latitude":, "picture": "", "width": "", "length": "", "sidebar": "", "google_object": google_marker}
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
        // alert(map.getDraggableCursor())
        //map.draggableCursor("wait")
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
        this.temp_infowindow = new google.maps.InfoWindow({
            content: MapObject.map_share_html,
            disableAutoPan:false
        })
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
       
        if(type == 'notes'){
          
            $.ajax({                                                
                type: "POST",                                    
                url: "/notes",                                     
                data: "note[body]="+ $("#note_body").val()+ "&ajax=true"+ "&marker[marker_latitude]=" +markerLatLng.lat()+ "&marker[marker_longitude]=" +markerLatLng.lng(),    
                success: function(message){                 
                    alert(message.msg); 
                    MapObject.add_info_to_marker_from_data(MapObject.temp_marker,message.msg)
                } 
            });  
        }else{
           
    }
    },
    
    add_info_to_marker_from_data: function(marker,html){

        google.maps.event.addListener(marker, 'click', function(e){
                    infowindow = new google.maps.InfoWindow({
            content: html,
            disableAutoPan:false
        });
            infowindow.open(MapObject.map,marker);
        });
        this.temp_infowindow.close();
    //MapObject.markers.push(marker);

    }
    
    
    
  
}

