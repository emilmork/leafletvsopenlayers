define(function(require){
  var MapView = require("views/MapView"),
      map;

    var OLView = MapView.extend({

      // Called on initialize
      initMap : function(){
        



        // this.vectorLayer = new OpenLayers.Layer.Vector("Søk", { 
        //     name : "Søk",
        //     strategies: [
        //         new OpenLayers.Strategy.Cluster({
        //             distance: 75
        //         })
        //     ],
        //     styleMap : this.styleMap()
        // });

        // var fromProjection = new OpenLayers.Projection("EPSG:4326");   // WGS 1984
        // var toProjection   = new OpenLayers.Projection("EPSG:900913"); // Spherical Mercator Projection
        // var position       = new OpenLayers.LonLat(this.Trondheim.lat, this.Trondheim.lon).transform(fromProjection, toProjection);
        // var zoom           = 10; 

      },



      imagesReceived : function() {
        this.clearImages();

        var features = [];
        this.collection.each(function(image) {

          var lonLat = this.getLonLatObj(image.get("longitude"), image.get("latitude"));
          var f = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat));
            
          features.push(f);

        }, this);

        this.vectorLayer.addFeatures(features);
      },


      createPopup : function (content, lonLat) {

      },

      clearImages : function() {

      }






























      // geoJsonReceived : function(geojson) {
      //   var geojson_format = new OpenLayers.Format.GeoJSON({
      //           'internalProjection': new OpenLayers.Projection("EPSG:900913"),
      //           'externalProjection': new OpenLayers.Projection("EPSG:4326")
      //       });
      //   var vector_layer = new OpenLayers.Layer.Vector(); 
      //   vector_layer.setName(geojson.get("name"));
      //   vector_layer.setVisibility(false);
      //   vector_layer.addFeatures(geojson_format.read(geojson.toJSON()));
      //   this.map.addLayer(vector_layer);
      // },

      // getLonLatObj : function(longitude, latitude) {
      //   return onLat = new OpenLayers.LonLat(longitude, latitude).transform(
      //         new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
      //         this.map.getProjectionObject() // to Spherical Mercator Projection
      //     );
      // },



      // styleMap : function(){

      //     var style = new OpenLayers.Style({
      //         'label': "${label}",
      //         'pointRadius' : "${radius}",
      //         'externalGraphic' : "${image}"
      //       }, {
      //         context: {
      //           radius : function(feature) {
      //             return 12 + (feature.cluster.length / 2);
      //           },
      //           label: function(feature) {
      //               var length = feature.cluster.length
      //               return (length > 1) ? length : "";
      //           },
      //           image : function(feature) {
      //             var count = feature.cluster.length;
      //             if(count == 1) {
      //                 return "scripts/libs/openlayers/img/marker-blue.png"
      //             } else if(count > 1 && count <= 10) {
      //                 return "scripts/libs/openlayers/img/cluster_green.png"
      //             } else {
      //                return "scripts/libs/openlayers/img/cluster_yellow.png";
      //             }
      //           }
      //         }
      //     });

      //   return new OpenLayers.StyleMap(style);
      // }

    });

    return OLView;

});





