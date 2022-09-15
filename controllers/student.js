const Student = require('../models/Student');

module.exports = {
	getStudent: (req, res) => {
		res.render('studentInfo');
	},
	searchStudent: async (req, res) => {
		try {
			console.log(req.query.ID);
			const student = await Student.findOne({
				ID: req.query.ID,
			});
			res.render('studentInfo', { name: student.firstName });
		} catch (error) {
			res.render('studentInfo');
		}
	},
	addNewStudent: (req, res) => {
		res.render('addStudent');
	},
	postNewStudent: async (req, res) => {
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
			const goalGrade = req.body.goalGrade;
			let domain;
			switch (req.body.domain) {
				case 'curriculum':
					domain = 'Curriculum and Learning Environment';
					break;
				case 'socialEmotional':
					domain = 'Social / Emotional';
					break;
				case 'independentFunctioning':
					domain = 'Independent Functioning';
					break;
				case 'healthcare':
					domain = 'HealthCare';
					break;
				case 'communication':
					domain = 'Communication';
					break;
			}
			const goal = {
				domain: domain,
				text: req.body.goalText,
				succeed: succeed,
				notes: req.body.notes,
			};
			console.log(goal);
			console.log(goalGrade);
			const student = Student.find({
				ID: req.body.ID,
			});
			await student.updateOne({
				$push: { [goalGrade]: { goal } },
			});
		} catch (error) {
			console.error(error);
		}
		res.redirect('/student/addGoals');
	},
};
