const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');
router.get('/addGoals', ensureAuth, studentController.addGoalsPage);
router.post('/addGoals', ensureAuth, studentController.addGoals);
