const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');

// router.get('/', ensureAuth, studentController.getStudent);
router.get('/searchStudent', ensureAuth, studentController.searchStudent);
router.post('/searchStudent', ensureAuth, studentController.searchStudent);
router.get(
	'/loadAccommodations',
	ensureAuth,
	studentController.loadAccommodations
);
router.get('/addNewStudent', ensureAuth, studentController.addNewStudent);
router.post(
	'/addNewStudent',
	ensureAuth,
	upload.single('file'),
	studentController.postNewStudent
);
router.get('/addGoals', ensureAuth, studentController.addGoalsPage);
router.delete('/deleteStudent', ensureAuth, studentController.deleteStudent);
router.post('/addGoals', ensureAuth, studentController.addGoals);
router.get(
	'/addAccommodations',
	ensureAuth,
	studentController.addAccommodations
);
router.post(
	'/addAccommodations',
	ensureAuth,
	studentController.postAccommodations
);
router.get('/editStudent/:id', ensureAuth, studentController.getEditPage);

module.exports = router;
