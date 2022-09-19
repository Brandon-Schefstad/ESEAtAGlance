const mongoose = require('mongoose');
const StudentSchema = require('./Student.js').schema;

const AccommodationSchema = new mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student',
	},
	description: {
		type: String,
	},
	Testing: {
		type: Boolean,
	},
});
module.exports = mongoose.model('Accommodations', AccommodationSchema);
