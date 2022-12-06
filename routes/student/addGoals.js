const express = require('express');
const router = express.Router();
const goalsController = require('../../controllers/student/addGoals.js');
const { ensureAuth } = require('../../middleware/auth');
router.get('/addGoals', ensureAuth, goalsController.addGoalsPage);
router.post('/addGoals', ensureAuth, goalsController.addGoals);
module.exports = router;
