const express = require('express')
const router = express.Router()
const searchStudentController = require('../../controllers/student/searchStudent')
const { ensureAuth } = require('../../middleware/auth')

router.get(
	'/searchStudent/:id',
	ensureAuth,
	searchStudentController.searchStudent
)

module.exports = router
