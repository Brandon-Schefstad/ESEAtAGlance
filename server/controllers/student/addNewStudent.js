const Student = require('../../models/Student')
const cloudinary = require('../../middleware/cloudinary')

module.exports = {
	getAddNewStudentPage: async (req, res) => {
		res.render('addStudent')
	},
	/**Adds a new student with cloudinary hosting the profile photo */
	postNewStudent: async (req, res) => {
		try {
			const result = await cloudinary.uploader.upload(req.file.path)
			await Student.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				ID: req.body.ID,
				grade: req.body.grade,
				primaryExceptionality: req.body.primary,
				caseManager: req.user._id,
				history: [],
				accommodations: [],
				IEPDueDate: req.body.IEP,
				cloudinaryID: result.public_id,
				image: result.secure_url,
			})
			if (req.body.ID) {
				res.cookie('ID', `${req.body.ID}`, { httpOnly: true })
			}
			res.redirect('/student/addGoals')
		} catch (err) {
			console.error(err)
		}
	},
}
