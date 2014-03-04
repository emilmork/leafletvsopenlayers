define(function(require){
  var _             = require('underscore');
  var Backbone      = require('backbone');
  var $             = require('jquery');
  var GeoJson       = require('models/GeoJson');
  var OpenLayers    = require('openlayers');
  var L             = require('leaflet');
  var ImageTemplate = require('text!../../template/imagePopup.html');
  var Handlebars    = require('handlebars');

  require('leafletCluster');


    var MapView = Backbone.View.extend({
      imageTemplate : Handlebars.compile(ImageTemplate),

      Trondheim : {
        lat: 10.4387621, lon : 63.41873
      },

      Layers : [
        {
          name : "Elvbekk",
          path : "elvbekk",
        },
        {
          name : "Turisthytter",
          path : "turisthytte"
        },
        {
          name : "Værnede områder",
          path : "verneomrade"
        }
      ],

      initialize : function() {

        this.collection.bind("sync", this.imagesReceived, this);

        this.initMap();

        this.getGeoJsonLayers();

        },


      getGeoJsonLayers : function() {
        _.each(this.Layers, function(layer) {
            var geojson = new GeoJson({ name : layer.name, path : layer.path});
            geojson.on("sync", this.geoJsonReceived, this);
            geojson.fetch();
        }, this);
      }

    });

    return MapView;

});





