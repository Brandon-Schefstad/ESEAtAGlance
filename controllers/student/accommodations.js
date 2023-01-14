const Student = require('../../models/Student')
const {
	presentation,
	response,
	setting,
	scheduling,
} = require('../utils/accommodations')

module.exports = {
	postAccommodations: async (req, res) => {
		try {
			let student = await Student.findOne({
				ID: req.body.ID,
			})
			if (!student) {
				res.sendStatus(404)
			}
			await student.updateOne({
				$unset: { accommodations: 1 },
			})
			await student.updateOne({
				$push: { accommodations: req.body.accommodationsToSend },
			})
			res.json(student)
		} catch (error) {
			console.error(error)
		}
	},
}
