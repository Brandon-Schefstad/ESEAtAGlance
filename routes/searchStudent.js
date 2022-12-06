const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');

router.get('/searchStudent', ensureAuth, studentController.searchStudent);
router.post('/searchStudent', ensureAuth, studentController.searchStudent);
module.exports = router;
