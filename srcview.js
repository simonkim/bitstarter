var express = require('express');

var app = express.createServer(express.logger());
var fs = require('fs');

/* if you face an error on requiring highlight.js,
 * $ npm install highlight.js
 */
var hljs = require('highlight.js');

app.get('/', function(request, response) {
  var buf;
  buf = fs.readFileSync( 'index.html' );
  response.send( buf.toString() );
});

app.get('/highlight', function(request, response) {

/* If you know the language
 * hljs.highlight(lang, code).value;
 */

/* Automatic language detection
 * hljs.highlightAuto(code).value;
 */
  var buf;
  var out;

  buf = fs.readFileSync( 'src/sample_source.c' );
  out = '<!DOCTYPE html>' +
	'<head>' +
	'  <title>highlight.js test</title>' +
	'  <meta charset="utf-8">' +
	'<link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/default.min.css">' +
	'<script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>' +
	'<body><code>';
  out += hljs.highlightAuto( buf.toString() ).value;
  out += '</code></body>';
  response.send( out );
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
