const Student = require('../../models/Student')
const cloudinary = require('../../middleware/cloudinary')

module.exports = {
	/**Adds a new student with cloudinary hosting the profile photo */
	postNewStudent: async (req, res) => {
		console.log(req.body)
		const { studentToSend, _id } = req.body
		try {
			// const result = await cloudinary.uploader.upload(req.body.profileImg)
			// console.log(result)
			const student = await Student.create({
				firstName: studentToSend.firstName,
				lastName: studentToSend.lastName,
				ID: studentToSend.ID,
				grade: studentToSend.grade,
				primaryExceptionality: studentToSend.primary,
				caseManager: _id,
				history: [],
				accommodations: [],
				IEPDueDate: studentToSend.IEP,
				// cloudinaryID: result.public_id,
				// image: result.secure_url,
			})

			res.send(student)
		} catch (err) {
			console.error(err)
		}
	},
}
