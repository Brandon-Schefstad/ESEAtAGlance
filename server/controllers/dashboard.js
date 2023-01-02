const Student = require('../models/Student')
module.exports = {
	getDashboard: async (req, res) => {
		const user = req.user
		try {
			const studentList = await Student.find({
				caseManager: req.user._id,
			}).populate({
				path: 'caseManager',
			})
			res.render('dashboard', {
				email: req.user.email,
				studentList: studentList,
			})
		} catch (error) {
			console.error(error)
			res.redirect('/')
		}
	},
}
