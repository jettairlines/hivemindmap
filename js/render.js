var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.1077387, lng: -88.2286079},
		zoom: 15
	});

//				 map.addListener('click', addLatLng);



	data.forEach(function(e){
	  
/*	  var marker = new MarkerWithLabel({
        position: new google.maps.LatLng(0,0),
        draggable: false,
        raiseOnDrag: false,
        map: map,
        labelContent: e.label,
        labelAnchor: new google.maps.Point(30, 20),
        labelClass: "labels", // the CSS class for the label
        labelStyle: {opacity: 1.0},
        icon: "http://placehold.it/1x1",
        visible: false
     });*/
	  
	  var temp = new google.maps.Polygon({
	   paths: e.points,
	   strokeWeight: 0,
	   fillColor: '#FF0000',
	   fillOpacity: 0.2
	  });

	  temp.setMap(map);
	  
	  google.maps.event.addListener(marker, "mousemove", function(event) {
		marker.setPosition(event.latLng);
		marker.setVisible(true);
	  });
	  google.maps.event.addListener(marker, "mouseout", function(event) {
		marker.setVisible(false);
	  });
	});
  

}