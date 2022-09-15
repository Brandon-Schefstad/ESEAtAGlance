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
	GradeK: {
		type: Array,
	},
	Grade1: {
		type: Array,
	},
	Grade2: {
		type: Array,
	},
	Grade3: {
		type: Array,
	},
	Grade4: {
		type: Array,
	},
	Grade5: {
		type: Array,
	},
	Grade6: {
		type: Array,
	},
	Grade7: {
		type: Array,
	},
	Grade8: {
		type: Array,
	},
	Grade9: {
		type: Array,
	},
	Grade10: {
		type: Array,
	},
	Grade11: {
		type: Array,
	},
	Grade12: {
		type: Array,
	},
	Grade13: {
		type: Array,
	},
	accommodations: {
		type: Array,
	},
});

module.exports = mongoose.model('Student', StudentSchema);
