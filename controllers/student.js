const Student = require('../models/Student');

module.exports = {
	getStudent: (req, res) => {
		res.render('student');
	},
	addNewStudent: async (req, res) => {
		try {
			await Student.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				ID: req.body.idNumber,
				grade: req.body.grade,
				primaryExceptionality: req.body.primary,
				history: [],
				accommodations: [],
			});
			console.log('Student has been added');
			res.redirect('/student/addGoals');
		} catch (err) {
			console.error(err);
		}
	},
	addGoalsPage: (req, res) => {
		res.render('addGoals');
	},
	addGoals: async (req, res) => {
		try {
			const succeed = req.body.succeed === 'on' ? true : false;
			const goal = {
				grade: req.body.goalGrade,
				domain: req.body.domain,
				text: req.body.goalText,
				succeed: succeed,
				notes: req.body.notes,
			};
			const student = Student.find({
				ID: req.body.ID,
			});
			await student.updateOne({
				$push: { history: { goal } },
			});
			console.log(goal);
		} catch (error) {
			console.error(error);
		}
		res.redirect('/student/addGoals');
	},
};
