const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');

router.get('/addNewStudent', ensureAuth, studentController.addNewStudent);
router.post(
	'/addNewStudent',
	ensureAuth,
	upload.single('file'),
	studentController.postNewStudent
);
router.get(
	'/loadAccommodations',
	ensureAuth,
	studentController.loadAccommodations
);

router.delete('/deleteStudent', ensureAuth, studentController.deleteStudent);
module.exports = router;
