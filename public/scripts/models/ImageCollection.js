define([
  'backbone',
  'jquery',
  'models/Image'
  ], function(Backbone, $, Image){

    var ImageCollection = Backbone.Collection.extend({
    model : Image,

    search : function(word) {
      this.reset();
      this.url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&extras=geo,url_s&api_key=0dca2fd383a623871cce6f4b7c75b76f&tags="+ word +"&tag_mode=all&has_geo=9999&format=json&nojsoncallback=1&per_page=50"
      this.fetch({ reset: true });
    },

    parse : function(data) {
      return data.photos.photo;
    }

    });

    return ImageCollection;

});





