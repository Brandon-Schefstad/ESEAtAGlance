const Student = require('../models/Student');

module.exports = {
	showStudentList: async (req, res) => {
		const user = req.user;
		const mongoID = user._id.toString().split('"').join('');
		console.log(mongoID);
		try {
			const studentList = await Student.find({
				caseManager: req.user._id,
			});
			console.log(studentList);
			res.render('studentList', {
				userName: req.user.userName,
				studentList: studentList,
			});
		} catch (error) {}
	},
};
