var map;
var infoWindow;
var HOST = 'http://localhost:5000/api/'
var drawnRectangles = [];

function redrawAllRectangles() {
  $.get(HOST + 'all', function(data) {
      drawnRectangles.forEach(function(r) {
          r.setMap(null);
      });
      data.rectangles.forEach(function(r) {
          var label = Object.keys(r.labels).reduce(function(a, b) { return r.labels[a] > r.labels[b] ? a : b });
          label += ' - ' + r.labels[label] + ' vote(s)';
          drawnRectangles.push(makePolygon(r.point1, r.point2, label));
      });
  });
}

function initialize() {
  var myOptions = {
    center: {lat: 40.1077387, lng: -88.2286079},
    zoom: 15
  };

  //render data
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    rectangleOptions: {
      fillColor: '#FF0000',
      fillOpacity: 0.25,
      strokeWeight: 0
    }
  });

  google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (polygon) {
    var label = window.prompt("What's your impression on this area?","nerds");
    var coordinates = polygon.getBounds();
    var url = coordinates.toUrlValue(8).split(",").join("/") + "/" + label;
    $.get(HOST + url, redrawAllRectangles);

    //make into our rec
    polygon.setVisible(false);
  });

  drawingManager.setMap(map);
}

// stolen from http://jsfiddle.net/tcfwH/304/
function makePolygon(p1, p2, label) {
    var marker = new MarkerWithLabel({
        position: new google.maps.LatLng(0,0),
        draggable: false,
        raiseOnDrag: false,
        map: map,
        labelContent: label,
        labelAnchor: new google.maps.Point(30, 20),
        labelClass: "labels", // the CSS class for the label
        labelStyle: {opacity: 1.0},
        icon: "http://placehold.it/1x1",
        visible: false
     });

    var poly = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds: {
            north: p1[0],
            south: p2[0],
            east: p2[1],
            west: p1[1]
        }
    });

    google.maps.event.addListener(poly, "mousemove", function(event) {
        marker.setPosition(event.latLng);
        marker.setVisible(true);
    });
    google.maps.event.addListener(poly, "mouseout", function(event) {
        marker.setVisible(false);
    });
    return poly;
}

google.maps.event.addDomListener(window, 'load', initialize);
