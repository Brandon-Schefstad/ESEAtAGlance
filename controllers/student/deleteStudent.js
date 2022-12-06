const Student = require('../../models/Student');
module.exports = {
	/**Searches DB for student */

	deleteStudent: async (req, res) => {
		try {
			const student = await Student.deleteOne({
				ID: req.body.ID,
			});
			res.redirect('/dashboard');
		} catch (error) {
			res.redirect('/dashboard');
		}
	},
};
