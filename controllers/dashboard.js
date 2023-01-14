const Student = require('../models/Student')
module.exports = {
	getDashboard: async (req, res) => {
		const _id = req.params.id
		try {
			const studentList = await Student.find({
				caseManager: _id,
			}).populate({
				path: 'caseManager',
			})

			res.json({
				studentList: studentList,
			})
		} catch (error) {
			console.error(error)
		}
	},
}
