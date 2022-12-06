const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');

router.get('/editStudent/:id', ensureAuth, studentController.getEditPage);
router.post('/editStudent/:id', ensureAuth, studentController.editStudent);
