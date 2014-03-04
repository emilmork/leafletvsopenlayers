
var express = require('express');
 
var app = express();

app.use(express.static(__dirname + '/public'));

 
app.get('/geojson/:type', function(req, res) {
	res.type("application/json")
    res.sendfile(__dirname + "/geojson/" + req.params.type +".geojson");
});

 
app.listen(9000);
console.log('Listening on port 9000...');
