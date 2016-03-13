var map;
var infoWindow;
var chicago = {lat: 41.85, lng: -87.65};

function initialize() {
  var myLatLng = new google.maps.LatLng(40.77, -73.97);
  var myOptions = {
		center: {lat: 40.1077387, lng: -88.2286079},
		zoom: 15
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  data.forEach(function(e){
	makePolygon(e.cords, e.label);
  });
    

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    circleOptions: {
      fillColor: '#FF0000',
      fillOpacity: 0.05,
      strokeWeight: 0
    },
	polygonOptions: {
      fillColor: '#FF0000',
      fillOpacity: 0.05,
      strokeWeight: 0
    },
	rectangleOptions: {
      fillColor: '#FF0000',
      fillOpacity: 0.05,
      strokeWeight: 0
    }
  });
  drawingManager.setMap(map);
  
}

// code stolen from http://jsfiddle.net/tcfwH/304/
function makePolygon(polyCoords, polyLabel) {
    var marker = new MarkerWithLabel({
        position: new google.maps.LatLng(0,0),
        draggable: false,
        raiseOnDrag: false,
        map: map,
        labelContent: polyLabel,
        labelAnchor: new google.maps.Point(30, 20),
        labelClass: "labels", // the CSS class for the label
        labelStyle: {opacity: 1.0},
        icon: "http://placehold.it/1x1",
        visible: false
     });

    var poly = new google.maps.Polygon({
        paths: polyCoords,
        strokeWeight: 0,
        fillColor: "#FF0000",
        fillOpacity: 0.05,
        map: map
    });

    google.maps.event.addListener(poly, "mousemove", function(event) {
        marker.setPosition(event.latLng);
        marker.setVisible(true);
    });
    google.maps.event.addListener(poly, "mouseout", function(event) {
        marker.setVisible(false);
    });
}


function addData(){
  
}

google.maps.event.addDomListener(window, 'load', initialize);