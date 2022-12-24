const Student = require('../../models/Student')
const Accommodations = require('../../models/Accommodations')
const {
	presentation,
	response,
	setting,
	scheduling,
} = require('../utils/accommodations')

module.exports = {
	getAccommodationsPage: async (req, res) => {
		res.render('addAccommodations')
	},
	addAccommodations: async (req, res) => {
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
			}).populate('accommodations')

			let accommodationArray = Object.keys(req.body).filter((element) => {
				return element !== 'ID'
			})
			const checkArr = student.accommodations.map((accomm) => {
				return accomm.name
			})
			await student.updateOne({
				$unset: { accommodations: 1 },
			})
			for (let i = 0; i < accommodationArray.length; i++) {
				const accomm = await Accommodations.create({
					student: student._id,
					name: accommodationArray[i],
					date: Date.now(),
				})
				await student.updateOne({
					$push: { accommodations: accomm },
				})
			}

			res.redirect('/student/addAccommodations/?ID=' + req.body.ID)
		} catch (error) {
			console.error(error)
		}
	},
}
