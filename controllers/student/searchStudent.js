const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudent: async (req, res) => {
		console.log(req.params)
		try {
			const studentSearchObject = await populateStudentObject(req.params.id)
			if (!studentSearchObject) {
				res.render('searchStudent', { error: 'No Student Found!' })
			}
			console.log(studentSearchObject)
			res.json(studentSearchObject)
		} catch (error) {
			console.error(error)
		}
	},
}
