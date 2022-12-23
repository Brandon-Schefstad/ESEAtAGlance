const express = require('express');
const router = express.Router();
const searchStudentController = require('../../controllers/student/searchStudent');
const { ensureAuth } = require('../../middleware/auth');

router.get('/searchStudent', ensureAuth, searchStudentController.searchStudent);
router.post(
	'/searchStudent',
	ensureAuth,
	searchStudentController.searchStudent
);
module.exports = router;
