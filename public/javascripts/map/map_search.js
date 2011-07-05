
 
    // Our global state
    var gLocalSearch;
    var gMap;
    var gInfoWindow;
    var gSelectedResults = [];
    var gCurrentResults = [];
    var gSearchForm;
 
    // Create our "tiny" marker icon

 
     // Set up the map and the local searcher.
    function OnLoadSearch() {
      gMap = MapObject.map
      // Initialize the local searcher
      gInfoWindow = new google.maps.InfoWindow;
      gLocalSearch = new GlocalSearch();
//      alert(gLocalSearch)
      gLocalSearch.setSearchCompleteCallback(null, OnLocalSearch);
    }
 
    function unselectMarkers() {
      for (var i = 0; i < gCurrentResults.length; i++) {
        gCurrentResults[i].unselect();
      }
    }
 
    function doSearch() {
//        alert(1)
      searchInside(); //先内部搜索
      var query = document.getElementById("txt_googleseach").value;
      gLocalSearch.setCenterPoint(gMap.getCenter());
     // alert(query)
      gLocalSearch.execute(query);
    }
 
    // Called when Local Search results are returned, we clear the old
    // results and load the new ones.
    function OnLocalSearch() {
    //    alert(gLocalSearch)
      if (!gLocalSearch.results) return;
      var searchWell = document.getElementById("searchwell");
 
      // Clear the map and the old search well
      searchWell.innerHTML = "";
      for (var i = 0; i < gCurrentResults.length; i++) {
        gCurrentResults[i].marker().setMap(null);
      }
      // Close the infowindow
      gInfoWindow.close();
 
      gCurrentResults = [];
      for (var i = 0; i < gLocalSearch.results.length; i++) {
        gCurrentResults.push(new LocalResult(gLocalSearch.results[i]));
      }
 
      var attribution = gLocalSearch.getAttribution();
      if (attribution) {
        document.getElementById("searchwell").appendChild(attribution);
      }
 
      // Move the map to the first result
      var first = gLocalSearch.results[0];
      gMap.setCenter(new google.maps.LatLng(parseFloat(first.lat),
                                            parseFloat(first.lng)));
 
    }
 
    // Cancel the form submission, executing an AJAX Search API search.
    function CaptureForm(searchForm) {
      gLocalSearch.execute(searchForm.input.value);
      return false;
    }
 
 
 
    // A class representing a single Local Search result returned by the
    // Google AJAX Search API.
    function LocalResult(result) {
      var me = this;
      me.result_ = result;
      me.resultNode_ = me.node();
      me.marker_ = me.marker();
      google.maps.event.addDomListener(me.resultNode_, 'mouseover', function() {
        me.select();
      });
      document.getElementById("searchwell").appendChild(me.resultNode_);
    }
 
    LocalResult.prototype.node = function() {
      if (this.resultNode_) return this.resultNode_;
      return this.html();
    };
 
    // Returns the GMap marker for this result, creating it with the given
    // icon if it has not already been created.
    LocalResult.prototype.marker = function() {
      var me = this;
      if (me.marker_) return me.marker_;
      var marker = me.marker_ = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(me.result_.lat),
                                         parseFloat(me.result_.lng)), map: gMap});
      google.maps.event.addListener(marker, "mouseover", function() {
        me.select();
      });
      return marker;
    };
 
    // Unselect any selected markers and then highlight this result and
    // display the info window on it.
    LocalResult.prototype.select = function() {
      unselectMarkers();
      this.selected_ = true;
      this.highlight(true);
      gInfoWindow.setContent(this.html(true));
      gInfoWindow.open(gMap, this.marker());
    };
 
    LocalResult.prototype.isSelected = function() {
      return this.selected_;
    };
 
    // Remove any highlighting on this result.
    LocalResult.prototype.unselect = function() {
      this.selected_ = false;
      this.highlight(false);
    };
 
    // Returns the HTML we display for a result before it has been "saved"
    LocalResult.prototype.html = function() {
      var me = this;
      var container = document.createElement("div");
      container.className = "unselected";
      container.appendChild(me.result_.html.cloneNode(true));
      return container;
    }
 
    LocalResult.prototype.highlight = function(highlight) {
      this.node().className = "unselected" + (highlight ? " red" : "");
    }
    
    GSearch.setOnLoadCallback(OnLoadSearch);
    
    
    
    //内部搜索，搜索place people 和活动 路线等。目前先做 place和peple
    function searchInside(){
        
    }