define(function(require){
var MapView = require("views/MapView");

    var LLView = MapView.extend({
      
      layers : new L.LayerGroup,
      markerArray : [],

      // Called on initialize
      initMap : function(){
        
        this.searchMarkers = new L.MarkerClusterGroup({ "showCoverageOnHover" : false });

      	this.map = L.map('map-leaflet').setView([this.Trondheim.lon, this.Trondheim.lat], 10);
      	this.imageLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(this.map);
        
        this.map.addLayer(this.searchMarkers);

        this.layerControl = L.control.layers({"Kart" : this.imageLayer}, {"Søk" : this.searchMarkers}).addTo(this.map);
      },

      // Called when search is finished
      imagesReceived : function() {
        this.clearImages();

        this.collection.each(function(image) {
          
          var marker = new L.Marker([image.get("latitude"), image.get("longitude")]);
          marker.bindPopup(this.imageTemplate(image.toJSON()));

          this.markerArray.push(marker);
          this.searchMarkers.addLayer(marker);
          
        }, this);

      },


      clearImages : function() {
        var _self = this;
        _.each(this.markerArray, function(marker) {
          this.searchMarkers.removeLayer(marker);
        }, this);
      },


      geoJsonReceived : function(geojson) {

        var layer = L.geoJson(geojson.toJSON(), {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.navn);
            }
        });
        this.layerControl.addOverlay(layer, geojson.get("name"));

      }


  	});

    return LLView;

});
