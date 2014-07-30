/* jshint node:true */
'use strict';
console.log('starting');
var express = require('express'),
    app = express(),
    api = require('grasshopper-api'),
    PORT = process.env.PORT || 3000;

api = api();
app.use(api.ghApi || api.router);
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log('Listening on: ' + PORT);
});
