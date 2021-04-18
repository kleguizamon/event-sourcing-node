const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
	clientId: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	item: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Event', eventSchema);
