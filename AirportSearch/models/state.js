var mongoose = require('mongoose');

// State Schema
var stateSchema = mongoose.Schema({
	name: {
		type: String
	},
	code:{
		type: String
	},
	loc:{
		type:{
			type: String
		},
		coordinates: {
			type: Array
		}
	}
});

var State = module.exports = mongoose.model('State', stateSchema);

// Get States
module.exports.getStates = function(callback, limit){
	State.find(callback);
}