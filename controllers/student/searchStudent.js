const populateStudentResObject = require('../utils/populateStudentResObject');
const cloudinary = require('../../middleware/cloudinary');
const dashboard = require('../dashboard.js');
const { ObjectId } = require('mongodb');

module.exports = {
	searchStudent: async (req, res) => {
		try {
			const resObject = await populateStudentResObject(req.query.ID);
			console.log(resObject);
			res.cookie('ID', `${req.query.ID}`, { httpOnly: true });
			res.render('searchStudent', { data: resObject });
		} catch (error) {
			res.render('searchStudent');
		}
	},
};
