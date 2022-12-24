const express = require('express')
const router = express.Router()
const editStudentController = require('../../controllers/student/editStudent.js')
const { ensureAuth } = require('../../middleware/auth')

router.get('/editStudent/', ensureAuth, editStudentController.getEditPage)
router.post('/editStudent/', ensureAuth, editStudentController.editStudent)
module.exports = router
