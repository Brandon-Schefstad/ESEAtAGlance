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
});
module.exports = mongoose.model('Accommodations', AccommodationSchema);
