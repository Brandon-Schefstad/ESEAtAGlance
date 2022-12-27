const express = require('express')
const router = express.Router()
const editStudentController = require('../../controllers/student/editStudent.js')
const { ensureAuth } = require('../../middleware/auth')

router.get('/editStudent/:id', ensureAuth, editStudentController.getEditPage)
router.post('/editStudent/:id', ensureAuth, editStudentController.editStudent)
module.exports = router
