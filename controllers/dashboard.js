const Student = require('../models/Student')
module.exports = {
	getDashboard: async (req, res) => {
		try {
			const studentList = await Student.find({
				caseManager: req.user.id,
			}).populate({
				path: 'caseManager',
			})
			res.json({
				studentList: studentList,
			})
		} catch (error) {
			console.error(error)
			res.redirect('/')
		}
	},
}
