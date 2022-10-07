const Student = require('../models/Student');
module.exports = {
	getDashboard: async (req, res) => {
		const user = req.user;
		const mongoID = user._id.toString().split('"').join('');
		try {
			const studentList = await Student.find({
				caseManager: req.user._id,
			}).populate({
				path: 'caseManager',
			});
			res.render('dashboard', {
				userName: req.user.userName,
				studentList: studentList,
			});
		} catch (error) {
			console.error(error);
			res.redirect('/');
		}
	},
	reloadDashboard: async (req, res) => {
		try {
		} catch (error) {
			console.error(error);
		}
	},
};
