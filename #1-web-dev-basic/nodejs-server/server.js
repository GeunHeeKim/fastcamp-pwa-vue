//var http = require('http');

// http.createServer(function(request, response) {
//   response.write('Hello world!');
//   response.end();
// }).listen(8080);

var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send('Hello World from Express');

});

app.listen('8080', function() {
  console.log('Express server is running');
})