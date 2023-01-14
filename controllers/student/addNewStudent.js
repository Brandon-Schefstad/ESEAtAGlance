const Student = require('../../models/Student')
const cloudinary = require('../../middleware/cloudinary')

module.exports = {
	/**Adds a new student with cloudinary hosting the profile photo */
	postNewStudent: async (req, res) => {
		console.log('Adding new student')
		try {
			// const result = await cloudinary.uploader.upload(req.body.profileImg)
			// console.log(result)
			const student = await Student.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				ID: req.body.ID,
				grade: req.body.grade,
				primaryExceptionality: req.body.primary,
				caseManager: req.user._id,
				history: [],
				accommodations: [],
				IEPDueDate: req.body.IEP,
				// cloudinaryID: result.public_id,
				// image: result.secure_url,
			})

			res.send(student)
		} catch (err) {
			console.error(err)
		}
	},
}
