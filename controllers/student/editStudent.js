const Student = require('../../models/Student');
const Goal = require('../../models/Goals.js');
const Teacher = require('../../models/Teacher');
const populateStudentResObject = require('../utils/populateStudentResObject');
module.exports = {
	getEditPage: async (req, res) => {
		try {
			const resObject = await populateStudentResObject(req.params.id);
			res.render('editStudent', {
				data: resObject,
			});
		} catch (error) {
			console.error(error);
		}
	},

	// .save() method for updating and targeting
	// Find
	// Manip
	// Save
	editStudent: async (req, res) => {
		try {
			const student = await Student.find({
				_id: req.body._id,
			}).populate({
				path: 'accommodations',
			});
			const caseManager = await Teacher.findOne({
				username: req.body.caseManager,
			});
			await Student.updateMany(
				{ ID: req.body.ID },
				{
					$set: {
						primaryExceptionality: req.body.primary,
						ID: req.body.ID,
						caseManager: caseManager,
						grade: req.body.grade,
						IEPDueDate: req.body.IEP,
					},
				}
			);
			await Student.updateOne(
				{ ID: req.body.ID },
				{
					$unset: { history: 1 },
				}
			);
			const domainCheck =
				typeof req.body.domain === 'string'
					? [req.body.domain]
					: req.body.domain;

			for (let i = 0; i < domainCheck.length; i++) {
				if (
					req.body.attained === 'on' &&
					typeof req.body.attained === 'object'
				) {
					req.body.attained = req.body.attained.splice(i + 1);
				}
				if (domainCheck.length === 1) {
					const goalObj = await Goal.create({
						student: req.body._id,
						grade: [req.body.goalGrade][i],
						domain: [req.body.domain][i],
						text: [req.body.text][i],
						succeed: [req.body.attained][i] === 'on' ? true : false,
					});
					await Student.updateOne(
						{ ID: req.body.ID },
						{
							$push: { history: goalObj },
						}
					);
				} else {
					const goalObj = await Goal.create({
						student: req.body._id,
						grade: req.body.goalGrade[i],
						domain: req.body.domain[i],
						text: req.body.text[i],
						succeed: req.body.attained[i] === 'on' ? true : false,
					});
					await Student.updateOne(
						{ ID: req.body.ID },
						{
							$push: { history: goalObj },
						}
					);
				}
			}
			res.redirect('/student/editStudent/' + req.body.ID);
		} catch (error) {
			console.error(error);
		}
	},
};
