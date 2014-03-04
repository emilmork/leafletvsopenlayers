define([
  'backbone',
  'jquery',
  ], function(Backbone, $){

    var GeoJson = Backbone.Model.extend({

        initialize : function() {
          this.url = "/geojson/" + this.get("path");
        }

    });

    return GeoJson;

});











