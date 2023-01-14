const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudent: async (req, res) => {
		try {
			const studentSearchObject = await populateStudentObject(req.params.id)
			if (!studentSearchObject) {
				res.sendStatus(404)
			}

			res.json(studentSearchObject)
		} catch (error) {
			console.error(error)
		}
	},
}
