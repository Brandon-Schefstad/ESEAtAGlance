const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, studentController.getStudent);
router.post('/addNewStudent', ensureAuth, studentController.addNewStudent);
router.get('/addGoals', ensureAuth, studentController.addGoalsPage);
router.post('/addGoals', ensureAuth, studentController.addGoals);

module.exports = router;
