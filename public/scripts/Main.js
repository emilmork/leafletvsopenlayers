require.config({
  baseUrl: 'scripts',
  paths: {
  	'jquery': 'libs/jquery/jquery.min',
		'openlayers': 'libs/openlayers/OpenLayers',
    'leaflet' : 'libs/Leaflet/leaflet',
    'leafletCluster' : 'libs/leaflet/leaflet.markercluster-src',
    'underscore' : 'libs/backbone/underscore',
		'backbone': 'libs/backbone/backbone',
    'text' : 'libs/text/text',
    'handlebars' : 'libs/handlebars/handlebars-v1.3.0',
  },
      shim: {
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        underscore : {
          exports: '_'
        },
        openlayers : {
          exports : 'OpenLayers'
        },
        leafletCluster : {
          deps :['leaflet']
        },
        handlebars : {
          exports : 'handlebars',
          init: function() {
            this.Handlebars = Handlebars;
            return this.Handlebars;
      }
        }

    }

});

require(['jquery','App'],function($,App) {
  
	var app = new App({ el:$(".container")});

});




