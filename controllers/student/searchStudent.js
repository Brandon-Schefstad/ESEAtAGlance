const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudent: async (req, res) => {
		const { id } = req.params
		try {
			const studentSearchObject = await populateStudentObject(id)
			if (!studentSearchObject) {
				res.status(400).json({ error: 'No Student Found!' })
			}
			res.json(studentSearchObject)
		} catch (error) {
			console.error(error)
		}
	},
}
