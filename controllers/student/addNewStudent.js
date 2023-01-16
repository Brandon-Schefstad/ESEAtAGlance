const Student = require('../../models/Student')
const cloudinary = require('../../middleware/cloudinary')

module.exports = {
	/**Adds a new student with cloudinary hosting the profile photo */
	postNewStudent: async (req, res) => {

		const { studentToSend, _id } = req.body

		try {
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
			if (!student) {
				throw new Error('Malformed Data')
			}
			res.send(student)
		} catch (err) {
			console.error(err)
			res.status(400).json({ error: 'Malformed entry' })
		}
	},
}
