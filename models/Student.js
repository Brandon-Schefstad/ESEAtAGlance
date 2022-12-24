const mongoose = require('mongoose')

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
			type: String,
		},
	],
	IEPDueDate: {
		type: Date,
		required: true,
	},
	cloudinaryID: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Student', StudentSchema)
