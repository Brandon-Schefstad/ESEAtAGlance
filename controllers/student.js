const Student = require('../models/Student');

module.exports = {
	getStudent: (req, res) => {
		res.render('studentInfo');
	},
	addNewStudent: (req, res) => {
		res.render('addStudent');
	},

	searchStudent: async (req, res) => {
		try {
			const student = await Student.findOne({
				ID: req.query.ID,
			});
			console.log(req.query);
			res.render('studentInfo', {
				name: student.firstName + ' ' + student.lastName,
				ID: student.ID,
				grade: student.grade,
				primary: student.primaryExceptionality,

				history: [
					student.GradeK.sort(),
					student.Grade1,
					student.Grade2,
					student.Grade3,
					student.Grade4,
					student.Grade5,
					student.Grade6,
					student.Grade7,
					student.Grade8,
					student.Grade9,
					student.Grade10,
					student.Grade11,
					student.Grade12,
					student.Grade13,
				],
			});
		} catch (error) {
			res.render('studentInfo');
		}
	},

	// searchGoals: async (req, res) => {
	// 	const student = await Student.findOne({
	// 		ID: req.params.ID,
	// 	});
	// 	res.redirect('/student/searchStudent');
	// },
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
		res.render('addGoals.pug', {
			ID: req.body.ID,
		});
	},
};
