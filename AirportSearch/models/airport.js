var mongoose = require('mongoose');

State = require('./state.js');

// Airport Schema
var airportSchema = mongoose.Schema({
	loc:{
		type:{
			type: String
		},
		coordinates: {
			type: Array
		},
		name: {
			type: String
		},
		code:{
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	}
});

var Airport = module.exports = mongoose.model('Airport', airportSchema);

// Get Airports 
module.exports.getAirports = function(callback, limit){
	Airport.find(callback);
}

