const mongoose = require('mongoose');
const StudentSchema = require('./Student.js').schema;

const AccommodationSchema = new mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student',
	},
	name: {
		type: String,
		required: true,
	},
	dateAdded: {
		type: Date,
		default: Date.now(),
	},
	category: {
		type: String,
		required: true,
		default: 'other',
	},
});
module.exports = mongoose.model('Accommodations', AccommodationSchema);
