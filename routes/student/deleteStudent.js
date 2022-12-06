const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');

router.delete('/deleteStudent', ensureAuth, studentController.deleteStudent);
