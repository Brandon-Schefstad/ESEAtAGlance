const express = require('express')
const router = express.Router()
const goalsController = require('../../controllers/student/addGoals.js')
const { ensureAuth } = require('../../middleware/auth')
router.post('/addNewGoal', ensureAuth, goalsController.addGoals)
module.exports = router
