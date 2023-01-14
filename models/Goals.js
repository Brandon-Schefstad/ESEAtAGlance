const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student',
	},
	grade: {},
	domain: {
		type: String,
	},
	text: {
		type: String,
	},
	succeed: { type: Boolean },
	notes: { type: String },
})
module.exports = mongoose.model('Goals', GoalSchema)
