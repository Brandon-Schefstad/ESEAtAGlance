const express = require('express')
const router = express.Router()
const searchStudentController = require('../../controllers/student/searchStudent')
const { ensureAuth } = require('../../middleware/auth')

router.get(
	'/searchStudentIndex',
	ensureAuth,
	searchStudentController.searchStudentIndex
)
router.get(
	'/searchStudentPage',
	ensureAuth,
	searchStudentController.searchStudent
)

module.exports = router
