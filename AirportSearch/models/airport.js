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

// Get Airports By State
module.exports.getAirportByState = function(stateCode, callback, limit){
	State.findOne({code: stateCode}, function(err, state){
		var state = state;

		Airport.find({
			loc: {
				$geoWithin:{
					$geometry: state.loc
				}
			}
		},
		{
			name: 1,
			type: 1,
			code: 1,
			_id: 0
		}, callback).limit().sort([['name', 'ascending']]);
	});
}

// Get Airports By Proximity
module.exports.getAirportsByProximity = function(location, callback, limit){
	Airport.find({
		loc:{
			$near: {
				$geometry:{
					type:"Point",
					coordinates:[-73.965355,40.782865]
				},
				$maxDistance: 20000
			}
		}
	},
	{
		name: 1,
		code: 1,
		_id: 0
	}, callback).limit(limit);
}
