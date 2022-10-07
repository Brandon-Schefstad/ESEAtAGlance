const mongoose = require('mongoose');
const TeacherSchema = require('./Teacher.js').schema;
const GoalSchema = require('./Goals.js').schema;

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
	caseManager: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Teacher',
	},
	history: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Goals',
		},
	],
	accommodations: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Accommodations',
		},
	],
	IEPDueDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Student', StudentSchema);
