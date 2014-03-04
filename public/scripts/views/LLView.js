define(function(require){
var MapView = require("views/MapView");

    var LLView = MapView.extend({
      
      layers: new L.LayerGroup,
      markerArray : [],
      // Called on initialize
      initMap : function(){
        

      },

      // Called when search is finished
      imagesReceived : function() {


      },


      clearImages : function() {

      },


      geoJsonReceived : function(geojson) {



      }


  	});

    return LLView;

});
