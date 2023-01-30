const Student = require('../../models/Student')
const Goal = require('../../models/Goals.js')

module.exports = {
	addGoals: async (req, res) => {
		const { goalGrade, domain, goalText, goalNotes, attained, ID } =
			req.body.goalToSend
		try {
			const goal = await Goal.create({
				grade: goalGrade,
				domain: domain,
				text: goalText,
				succeed: attained === 'true' ? true : false,
				notes: goalNotes,
			})

			const student = Student.findOne({
				ID: ID,
			})
			await student.updateOne({
				$push: { history: goal },
			})

			res.json({ ID: ID })
		} catch (error) {
			console.error(error)
		}
	},
}
