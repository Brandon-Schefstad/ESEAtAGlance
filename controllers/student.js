const Student = require('../models/Student');
const Accommodations = require('../models/Accommodations.js');
const Goal = require('../models/Goals.js');

module.exports = {
	addNewStudent: (req, res) => {
		res.render('addStudent');
	},

	searchStudent: async (req, res) => {
		try {
			let student = await Student.findOne({
				ID: req.query.ID,
			})
				.populate({
					path: 'history',
				})
				.populate({
					path: 'caseManager',
				})
				.populate({
					path: 'accommodations',
				})
				.lean();
			let history = [[], [], [], [], [], [], [], [], [], [], [], [], []];
			student.history.forEach((goal) => {
				history[parseInt(goal.grade)].push(goal);
			});
			let returnHistory = history.filter((subArr) => {
				return subArr.length > 0;
			});
			const resObject = {
				name: student.firstName + ' ' + student.lastName,
				ID: student.ID,
				grade: student.grade,
				caseManager: student.caseManager.userName,
				primary: student.primaryExceptionality,
				history: returnHistory,
				accommodations: student.accommodations,
			};
			console.log(resObject);
			res.render('searchStudent', { data: resObject });
		} catch (error) {
			res.render('searchStudent');
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
			console.log(req.body);
			await Student.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				ID: req.body.idNumber,
				grade: req.body.grade,
				primaryExceptionality: req.body.primary,
				caseManager: req.user._id,
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
			const goal = await Goal.create({
				grade: req.body.goalGrade,
				domain: domain,
				text: req.body.goalText,
				succeed: succeed,
				notes: req.body.notes,
			});
			const student = Student.find({
				ID: req.body.ID,
			});
			await student.updateOne({
				$push: { history: goal },
			});
		} catch (error) {
			console.error(error);
		}
		res.render('addGoals.pug', {
			ID: req.body.ID,
		});
	},
	addAccommodations: async (req, res) => {
		//  Add dynamic page for add/delete accoms?
		res.render('addAccommodations');
	},
	loadAccommodations: async (req, res) => {
		console.log(req.body);
		res.render('addAccommodations');
	},
	postAccommodations: async (req, res) => {
		// Identify a student
		let student = await Student.findOne({
			ID: req.body.ID,
		});
		console.log(req.body);
		// Make array of Accommodation names, sans ID
		let accommodationArray = Object.keys(req.body).filter((element) => {
			return element !== 'ID';
		});
		// Array to push to DB
		let accommodationPushArray = [];
		for (let i = 0; i < accommodationArray.length; i++) {
			let accommodation = await Accommodations.findOne({
				name: accommodationArray[i],
			});

			if (!accommodation) {
				const returnAccomm = await Accommodations.create({
					student: student._id,
					name: accommodationArray[i],
					dateAdded: Date.now(),
				});
				accommodationPushArray.push(returnAccomm);
			} else if (!student.accommodations.includes(accommodation._id)) {
				accommodationPushArray.push(accommodation._id);
			}
		}
		console.log(accommodationPushArray);

		await student.updateOne({
			$push: { accommodations: accommodationPushArray },
		});
		res.render('addAccommodations');
	},
};
