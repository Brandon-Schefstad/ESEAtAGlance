const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudentIndex: async (req, res) => {
		res.clearCookie('ID')
		res.render('searchStudent')
	},
	searchStudent: async (req, res) => {
		try {
			const studentObject = await populateStudentObject(req.query.ID)
			if (!studentObject) {
				res.render('searchStudent', { error: 'No Student Found!' })
			}
			res.cookie('ID', `${req.query.ID}`, { httpOnly: true })
			res.render('searchStudent', { data: studentObject })
		} catch (error) {
			console.error(error)
		}
	},
}
