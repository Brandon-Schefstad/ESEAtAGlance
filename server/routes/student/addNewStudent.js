const express = require('express');
const router = express.Router();
const addNewStudentController = require('../../controllers/student/addNewStudent');
const { ensureAuth } = require('../../middleware/auth');
const upload = require('../../middleware/multer');

router.get(
	'/addNewStudent',
	ensureAuth,
	addNewStudentController.getAddNewStudentPage
);
router.post(
	'/addNewStudent',
	ensureAuth,
	upload.single('file'),
	addNewStudentController.postNewStudent
);
module.exports = router;
