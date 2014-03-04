define([
  'jquery',
  'backbone',
   'views/OLView',
   'views/LLView',
   'models/imageCollection',
   'handlebars'
  ], function( $, Backbone, OLView, LLView, ImageCollection,GeoJson, Handlebars){
    var App = Backbone.View.extend({
      
      events: {
        'keypress #input-text' : 'keyInput',
        'click .search-btn' : 'searchWithText'
      },

      initialize: function(){
        this.input = this.$el.find("#input-text");

        this.imageCollection = new ImageCollection();
        olview = new OLView({el : this.$el.find("#map-openlayers"), collection: this.imageCollection });
        llview = new LLView({el : this.$el.find("#map-leaflet"), collection: this.imageCollection });

        this.imageCollection.bind("sync", function() {
          this.reacteOnSearchEnd();
        }, this);
      },

      keyInput : function(e) {
        if(e.which !== 13) return;
        this.searchWithText(e);
      },

      searchWithText: function(e){
        e.preventDefault();

        this.imageCollection.search(this.input.val());
        this.reacteOnSearch();
        
      },

      reacteOnSearch: function() {
        this.$el.find(".map").addClass("blink");
        this.$el.find(".search-btn").html("Wait for it!");
        this.$el.find(".search-btn").addClass("disabled");
      },
      reacteOnSearchEnd: function () {
        this.$el.find(".map").removeClass("blink");
        this.$el.find(".search-btn").html("Search");
        this.$el.find(".search-btn").removeClass("disabled");
      }

    });

return App;

});





