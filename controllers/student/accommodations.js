const Student = require('../../models/Student')
const {
	presentation,
	response,
	setting,
	scheduling,
} = require('../utils/accommodations')

module.exports = {
	seeStudentAccommodations: async (req, res) => {
		try {
			if (req.cookies.ID || req.query.ID) {
				const student = await Student.findOne({
					ID: req.cookies.ID || req.query.ID,
				}).populate({
					path: 'accommodations',
				})
				if (student) {
					res.render('addAccommodations.pug', {
						data: {
							student: student,
							accommodations: [
								{ presentation: presentation },
								{ response: response },
								{ scheduling: scheduling },
								{ setting: setting },
							],
						},
					})
				}
			} else {
				res.render('addAccommodations')
			}
		} catch (err) {
			console.error(err)
		}
	},

	postAccommodations: async (req, res) => {
		try {
			let student = await Student.findOne({
				ID: req.body.ID,
			})
			let accommodationArray = Object.entries(req.body)
				.slice(1)
				.map((entry) => {
					return entry[0]
				})
			await student.updateOne({
				$unset: { accommodations: 1 },
			})
			await student.updateOne({
				$push: { accommodations: accommodationArray },
			})
			res.redirect('/student/addAccommodations/?ID=' + req.body.ID)
		} catch (error) {
			console.error(error)
		}
	},
}
