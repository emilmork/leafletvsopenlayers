





var map, baseLayer, markers;
/*
$(document).keypress(function(e) {
	if(e.which == 13) {
		markers.clearMarkers();
		flickrSearch(getUrlWithSearchTag($("#input-text").val()));
	}
});
*/



var startLoadingOpenLayers = function(){
	map = new OpenLayers.Map( 'map' );
	baseLayer = new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0",{layers: 'basic'} );
      //map.addLayer(baseLayer);



      var pointLayer = new OpenLayers.Layer.Vector("Point Layer");
      var lineLayer = new OpenLayers.Layer.Vector("Line Layer");
      var polygonLayer = new OpenLayers.Layer.Vector("Polygon Layer");
      var boxLayer = new OpenLayers.Layer.Vector("Box layer");

      map.addLayers([baseLayer, pointLayer, lineLayer, polygonLayer, boxLayer]);
      map.addControl(new OpenLayers.Control.LayerSwitcher());
      map.addControl(new OpenLayers.Control.MousePosition());


      var box_controller = new OpenLayers.Control.DrawFeature(boxLayer,OpenLayers.Handler.RegularPolygon, {
      			handlerOptions: {
      				sides: 4,
      				irregular: true
      			}
      });


      box_controller.events.on({"featureadded" : featureAddedListener});


      map.addControl(box_controller);
      //box_controller.activate();


      map.setCenter(new OpenLayers.LonLat(10.624383, 65.197076), 4);

      markers = new OpenLayers.Layer.Markers("Cities");   			
      map.addLayer(markers);




  }

  var featureAddedListener = function(event){
  	var coords = event.feature.geometry.getBounds();
  	console.log(coords);
    flickrSearch(getUrlWithBbox(coords));

  }




  function allowPan(element) {
  	var stop = !element.checked;
  	for(var key in drawControls) {
  		drawControls[key].handler.stopDown = stop;
  		drawControls[key].handler.stopUp = stop;
  	}
  }


var getUrlWithSearchTag = function(tag){
	return "http://api.flickr.com/services/rest/?method=flickr.photos.search&extras=geo,url_s&api_key=0dca2fd383a623871cce6f4b7c75b76f&tags="+tag+"&tag_mode=all&has_geo=9999&format=json&nojsoncallback=1&";
}



var getUrlWithBbox = function(bounds){
	var left = bounds.left;
	var bottom = bounds.bottom;
	var right = bounds.right;
	var top = bounds.top;
	return "http://api.flickr.com/services/rest/?method=flickr.photos.search&extras=geo,url_s&bbox="+bottom+","+right+","+top+","+left+"&api_key=0dca2fd383a623871cce6f4b7c75b76f&tag_mode=all&has_geo=9999&format=json&nojsoncallback=1&";

}


  var flickrSearch = function(url){
    console.log(url);
  	$.getJSON(url, function(data)
  	{
  		for(var i=0;i<data.photos.photo.length;i++){

			   drawImagesOnMap(data.photos.photo[i]);
		  }

    });
  }

var drawImagesOnMap = function(image){
	console.log(image);
	var lon = image.longitude;
	var lat = image.latitude;

	var location = new OpenLayers.LonLat(lon,lat); 			
	var size = new OpenLayers.Size(21,21);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);


	var icon = new OpenLayers.Icon('https://cdn1.iconfinder.com/data/icons/yooicons_set01_socialbookmarks/64/social_flickr_box.png',size,offset); 

	var marker = new OpenLayers.Marker(location,icon.clone());
	
  marker.events.register('mousedown',marker,function(evt){ 

		var popup = new OpenLayers.Popup("Image",
		  new OpenLayers.LonLat(lon,lat),
			new OpenLayers.Size(150,150),
			"<div class='flickr-image-preview'><label class='image-title'>"+image.title+"</label>"+
			"<img class='image-preview' src='"+image.url_s+"'</img></div>",
			true);

	  map.addPopup(popup);
	});

	markers.addMarker(marker);
}







