const express = require('express');
const router = express.Router();
const deleteStudentController = require('../../controllers/student/deleteStudent.js');
const { ensureAuth } = require('../../middleware/auth');

router.delete(
	'/deleteStudent',
	ensureAuth,
	deleteStudentController.deleteStudent
);
module.exports = router;
