const Student = require('../../models/Student')
const cloudinary = require('../../middleware/cloudinary')

module.exports = {
	/**Adds a new student with cloudinary hosting the profile photo */

	postNewStudent: async (req, res) => {
		const { studentToSend, _id, imageUrl } = req.body
		console.log(imageUrl)
		try {
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
				image: imageUrl,
			})
			if (!student) {
				throw new Error('Malformed Data')
			}
			console.log(student)
			res.send(student)
		} catch (err) {
			console.error(err)
			res.status(400).json({ error: 'Malformed entry' })
		}
	},
}
