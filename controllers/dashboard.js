const Student = require('../models/Student')
module.exports = {
	getDashboard: async (req, res) => {
		console.log('getting dashboard')
		const user = req.user
		console.log(user)
		try {
			const studentList = await Student.find({
				caseManager: req.user._id,
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
