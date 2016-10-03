var express = require('express');
var express_geocoding_api = require('express-geocoding-api');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

//mongoose connect
mongoose.connect('mongodb://localhost/airfind');
var db = mongoose.connection;

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.get('/api', function(req, res){
	res.send('Please use /api/airports or /api/states endpoints');
});

app.listen(3000);
console.log('App started on port 3000');