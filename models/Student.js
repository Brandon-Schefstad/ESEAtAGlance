const mongoose = require('mongoose');
const TeacherSchema = require('./Teacher.js').schema;

// const ClassSchema = new mongoose.Schema({
// 	grade: {
// 		type: Number,
// 	},
// 	subject: {
// 		type: String,
// 	},
// teacher: {
// 	type: mongoose.Schema.Types.ObjectId,
// 	ref: 'Teacher',
// },
// });

// const GoalSchema = new mongoose.Schema({
// 	domain: {
// 		type: String,
// 	},
// 	text: { type: String },
// 	succeed: {
// 		type: String,
// 	},
// 	notes: { type: String },
// });

const StudentSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	ID: {
		type: Number,
	},
	grade: {
		type: Number,
	},
	primaryExceptionality: {
		type: String,
		required: true,
	},
	secondaryExceptionality: {
		type: String,
	},
	caseManager: { type: String },
	history: [{}],
	accommodations: {
		type: Array,
	},
});

module.exports = mongoose.model('Student', StudentSchema);
