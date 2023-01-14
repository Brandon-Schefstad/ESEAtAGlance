const Student = require('../models/Student')
module.exports = {
	getDashboard: async (req, res) => {
		console.log('getting dashboard')
		console.log(req.params.id)
		const _id = req.params.id
		try {
			const studentList = await Student.find({
				caseManager: _id,
			}).populate({
				path: 'caseManager',
			})
			console.log(studentList)
			res.json({
				studentList: studentList,
			})
		} catch (error) {
			console.error(error)
		}
	},
}
