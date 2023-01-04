const express = require('express')
const router = express.Router()
const addNewStudentController = require('../../controllers/student/addNewStudent')
const { ensureAuth } = require('../../middleware/auth')
const upload = require('../../middleware/multer')

router.post(
	'/addNewStudent',
	ensureAuth,
	// upload.single('profileImg'),
	addNewStudentController.postNewStudent
)
module.exports = router
