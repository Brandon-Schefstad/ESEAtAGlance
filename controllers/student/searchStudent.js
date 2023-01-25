const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudent: async (req, res) => {
		try {
			const studentSearchObject = await populateStudentObject(req.params.id)
			if (!studentSearchObject) {
				res.status(400).json({ error: 'No Student Found!' })
			}
			res.json(studentSearchObject)
		} catch (error) {
			console.error(error)
		}
	},
}
