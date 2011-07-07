/*  
*Author:karry  
*Version:1.0  
*Time:2008-12-01  
*KMapSearch 类  
*把GOOGLE MAP 和LocalSearch结合。只需要传入MAP\经纬度值，就可以把该经纬度附近的相关本地搜索内容取出来，在地图上标注出来，并可以在指定容器显示搜索结果  
*/  
  
(function() {   
    var KMapSearch=window.KMapSearch= function(map_, opts_) {   
        this.opts = {   
            container:opts_.container || "searchwell", 
            autoClear:true
        };   
        this.map = map_;   
        this.gLocalSearch = new google.search.LocalSearch();   
        
        this.gLocalSearch.setResultSetSize(GSearch.LARGE_RESULTSET);   
        this.gLocalSearch.setSearchCompleteCallback(this, function() {   
            if (this.gLocalSearch.results) {   
                var savedResults = document.getElementById(this.opts.container);   
  
                for (var i = 0; i < this.gLocalSearch.results.length; i++) {   
                    savedResults.appendChild(this.getResult(this.gLocalSearch.results[i]));   
                } 
                this.resetMarkerAll();
            }   
        });   
    }   
    KMapSearch.prototype.getResult = function(result) {   
        var container = document.createElement("div");   
        container.className = "list";   
        var myRadom =(new Date()).getTime().toString()+Math.floor(Math.random()*10000);   
        container.id=myRadom;   
        container.innerHTML = result.title + "<br />地址：" + result.streetAddress;   
        this.createMarker( new google.maps.LatLng(result.lat, result.lng), result.html);   
        return container;   
    }   
    KMapSearch.prototype.createMarker = function(latLng, content)   
    {   
        var marker = new google.maps.Marker({
            map:MapObject.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });   
        //            
        google.maps.event.addListener(marker, "mouseover", function() {   
            MapObject.infoWindow.setContent(content);
            MapObject.infoWindow.open(MapObject.map,marker);
        });   
        MapObject.markers_array.push(marker);
    }   
    KMapSearch.prototype.resetMarkerAll = function() {   
       
        
        if (MapObject.markerClusterer){
            MapObject.markerClusterer.clearMarkers();
            MapObject.markerClusterer.addMarkers(MapObject.markers_array);

        }else{
            var mcOptions = {
                gridSize: 50, 
                maxZoom: 15,
                minZoom: 5
            };
            MapObject.markerClusterer = new MarkerClusterer(MapObject.map, MapObject.markers_array,mcOptions);
        }
    }   
    KMapSearch.prototype.execute = function(latLng,keyWord) {   
        if (latLng) {   
            this.gLocalSearch.setCenterPoint(latLng);   
        }   
        this.gLocalSearch.execute(keyWord);   
    }   
})();
   
   
var mapSearch = new KMapSearch(MapObject.map, {
    container:"searchwell"
});   
   
function doSearch() {
    var savedResults = document.getElementById(mapSearch.opts.container);
    if (mapSearch.opts.autoClear) {   
        savedResults.innerHTML = "";   
        MapObject.markers_array = [];
    } 
    var query_key = document.getElementById("txt_googleseach").value
    searchInside(query_key); //先内部搜索
    mapSearch.execute(MapObject.map.center,query_key); 
}
    
//内部搜索，搜索place people 和活动 路线等。目前先做 place和peple
function searchInside(query_key){
  
    $.ajax({                                                
        type: "POST",                                    
        url: "/markers/search",                                     
        data: "key="+ query_key ,    
        success: function(message){  
            for (i =0;i<message.length;i++){
//                alert(message[i].html)
                html =   message[i].html              
                var marker = new google.maps.Marker({
                    map:MapObject.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(message[i].lat, message[i].lng)
                });   
                var fn = MapObject.markerClickFunction(html+"", marker);     
               google.maps.event.addListener(marker, 'mouseover', fn);  
                MapObject.markers_array.push(marker);
                mapSearch.resetMarkerAll();                
                                
            }
        } 
    });
        
}
    
     
    