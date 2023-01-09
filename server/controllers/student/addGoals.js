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
				succeed: attained === 'on' ? true : false,
				notes: goalNotes,
			})

			const student = Student.find({
				ID: parseInt(ID),
			})
			await student.updateOne({
				$push: { history: goal },
			})
			console.log(student.history)
			// res.sendStatus(200)
		} catch (error) {
			console.error(error)
		}
		// res.render('addGoals.pug', {
		// 	ID: req.body.ID,
		// })
	},
}
