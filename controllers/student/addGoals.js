const Student = require('../../models/Student');
const Goal = require('../../models/Goals.js');

module.exports = {
	addGoalsPage: (req, res) => {
		if (req.cookies.ID) {
			const ID = req.cookies['ID'];
			res.render('addGoals', {
				ID: ID,
			});
		} else {
			res.render('addGoals');
		}
	},
	addGoals: async (req, res) => {
		try {
			const succeed = req.body.succeed === 'on' ? true : false;
			let domain;
			switch (req.body.domain) {
				case 'curriculum':
					domain = 'curriculum';
					break;
				case 'socialEmotional':
					domain = 'socialEmotional';
					break;
				case 'independentFunctioning':
					domain = 'independentFunctioning';
					break;
				case 'healthcare':
					domain = 'healthcare';
					break;
				case 'communication':
					domain = 'communication';
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
};
