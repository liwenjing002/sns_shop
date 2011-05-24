/**
 * The MarkerClusterer object.
 * @type {MarkerCluster}
 */
var mc = null;

/**
 * The Map object.
 * @type {google.maps.Map}
 */
var map = null;

/**
 * The MarkerManager object.
 * @type {MarkerManager}
 */
var mgr = null;

/**
 * The KmlLayer object.
 * @type {google.maps.KmlLayer}
 */
var kmlLayer = null;

/**
 * The FusionTablesLayer object.
 * @type {google.maps.FusionTablesLayer}
 */
var fusionLayer = null;

/**
 * KML layer display/hide flag.
 * @type {boolean}
 */
var showKmlLayer = false;

/**
 * Fusion Tables layer display/hide flag.
 * @type {boolean}
 */
var showFusionLayer = false;

/**
 * Fusion Tables layer heatmap flag.
 * @type {boolean}
 */
var showFusionLayerHeatmap = false;

/**
 * Marker Clusterer display/hide flag.
 * @type {boolean}
 */
var showMarketClusterer = false;

/**
 * Marker Manager display/hide flag.
 * @type {boolean}
 */
var showMarketManager = false;


/**
 * Toggles heatmap use on Fusion Tables layer.
 */
function toggleFusionHeatmap() {
  if (fusionLayer) {
    showFusionLayerHeatmap = !showFusionLayerHeatmap;
    fusionLayer.set('heatmap', showFusionLayerHeatmap);
  }
}


/**
 * Toggles Fusion Tables layer visibility.
 */
function toggleFusion() {
alert()
  if (!fusionLayer) {
    fusionLayer = new google.maps.FusionTablesLayer(232506, {
      suppressInfoWindows: false
    });
    showFusionLayerHeatmap = false;
    fusionLayer.set('heatmap', showFusionLayerHeatmap);
  }
  showFusionLayer = !showFusionLayer;
  var li = document.getElementById('fusion-hm-li');
  if (showFusionLayer) {
    fusionLayer.setMap(map);
    li.style.visibility = 'visible';
  } else {
    fusionLayer.setMap(null);
    li.style.visibility = 'hidden';
  }
}


/**
 * Toggles KML layer visibility.
 */
function toggleKmlLayer() {
  if (!kmlLayer) {
    var kmlUrl = window.location.href.substring(
        0, 1 + window.location.href.lastIndexOf('/')) + 'markers.kml';
    kmlLayer = new google.maps.KmlLayer(kmlUrl, {
      preserveViewport: true,
      suppressInfoWindows: false
    });
  }
  showKmlLayer = !showKmlLayer;
  if (showKmlLayer) {
    kmlLayer.setMap(map);
  } else {
    kmlLayer.setMap(null);
  }
}


/**
 * Toggles Marker Manager visibility.
 */
function toggleMarkerManager() {
  showMarketManager = !showMarketManager;
  if (mgr) {
    if (showMarketManager) {
      mgr.addMarkers(markers.countries, 0, 5);
      mgr.addMarkers(markers.places, 6, 11);
      mgr.addMarkers(markers.locations, 12);
      mgr.refresh();
    } else {
      mgr.clearMarkers();
      mgr.refresh();
    }
  } else {
    mgr = new MarkerManager(map, {trackMarkers: true, maxZoom: 15});
    google.maps.event.addListener(mgr, 'loaded', function() {
      mgr.addMarkers(markers.countries, 0, 5);
      mgr.addMarkers(markers.places, 6, 11);
      mgr.addMarkers(markers.locations, 12);
      mgr.refresh();
    });
  }
}


/**
 * Toggles Marker Clusterer visibility.
 */
function toggleMarkerClusterer() {
	alert(showMarketClusterer)
	alert(map)
  showMarketClusterer = !showMarketClusterer;
  if (showMarketClusterer) {
    if (mc) {
      mc.addMarkers(markers.locations);
    } else {
      mc = new MarkerClusterer(map, markers.locations, {maxZoom: 19});
    }
  } else {
    mc.clearMarkers();
  }
alert(mc)
}




