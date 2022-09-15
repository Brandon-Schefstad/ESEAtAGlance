const mongoose = require('mongoose');
const TeacherSchema = require('./Teacher.js').schema;

const ClassSchema = new mongoose.Schema({
	grade: {
		type: Number,
	},
	subject: {
		type: String,
	},
	// teacher: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Teacher',
	// },
});

const GoalSchema = new mongoose.Schema({
	domain: {
		type: String,
		required: true,
	},
	text: { type: String, required: true },
	succeed: {
		type: Boolean,
		required: true,
	},
	notes: { type: String, required: true },
	teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});
const HistorySchema = new mongoose.Schema({
	grade: {
		type: Number,
	},
	goals: [GoalSchema],
});

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
	primaryExceptionality: {
		type: String,
		required: true,
	},
	secondaryExceptionality: {
		type: String,
	},
	caseManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
	currSchedule: [ClassSchema],
	history: HistorySchema,
	accommodations: {
		type: Array,
	},
});

module.exports = mongoose.model('Student', StudentSchema);
