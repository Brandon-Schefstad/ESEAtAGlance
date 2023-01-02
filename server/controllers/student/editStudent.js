const Student = require('../../models/Student')
const Goal = require('../../models/Goals.js')
const Teacher = require('../../models/Teacher')
const populateStudentObject = require('../utils/populateStudentObject')
module.exports = {
	getEditPage: async (req, res) => {
		try {
			const editStudentObject = await populateStudentObject(req.params.id)
			res.render('editStudent', {
				data: editStudentObject,
			})
		} catch (error) {
			console.error(error)
		}
	},
	editStudent: async (req, res) => {
		try {
			const caseManager = await Teacher.findOne({
				email: req.body.caseManager,
			})
			await Student.updateOne(
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
			)
			await Student.updateOne(
				{ ID: req.body.ID },
				{
					$unset: { history: 1 },
				}
			)
			// Ensures data from frontend is an array
			const domainList =
				typeof req.body.domain === 'string'
					? [req.body.domain]
					: req.body.domain
			// Uses order of elements in req.body to construct new goals
			let history = []
			for (let i = 0; i < domainList.length; i++) {
				const goalObj = await Goal.create({
					student: req.body._id,
					grade: req.body.goalGrade[i],
					domain: req.body.domain[i],
					text:
						typeof req.body.text === 'string'
							? req.body.text
							: req.body.text[i],
					succeed: req.body.attained[i] === 'on' ? true : false,
				})
				history.push(goalObj)
			}
			await Student.updateOne(
				{ ID: req.body.ID },
				{
					$push: { history: history },
				}
			)
			res.redirect('/student/searchStudentPage/?ID=' + req.body.ID)
		} catch (error) {
			console.error(error)
		}
	},
}
