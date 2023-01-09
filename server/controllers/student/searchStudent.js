const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudent: async (req, res) => {
		try {
			const studentSearchObject = await populateStudentObject(req.query.ID)
			if (!studentSearchObject) {
				res.render('searchStudent', { error: 'No Student Found!' })
			}
			res.cookie('ID', `${req.query.ID}`, { httpOnly: true })
			res.render('searchStudent', { data: studentSearchObject })
		} catch (error) {
			console.error(error)
		}
	},
}
