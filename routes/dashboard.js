const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard.js')
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', ensureAuth, dashboardController.getDashboard)

module.exports = router
