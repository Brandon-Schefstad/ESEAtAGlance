const express = require('express')
const router = express.Router()
const addNewStudentRoutes = require('./student/addNewStudent.js')
const searchStudentRoutes = require('./student/searchStudent.js')
const editStudentRoutes = require('./student/editStudent.js')
const accommodationsRoutes = require('./student/accommodations.js')
const deleteStudentRoutes = require('./student/deleteStudent')
const goalsRoutes = require('./student/addGoals.js')
/**Accommodations */
router.get('/addAccommodations', accommodationsRoutes)
router.get('/addAccommodations/:id', accommodationsRoutes)
router.post('/addAccommodations', accommodationsRoutes)
router.get('/getAccommodationsPage', accommodationsRoutes)

/**Goals*/
router.get('/addGoals', goalsRoutes)
router.post('/addGoals', goalsRoutes)

/**New Student */
router.get('/addNewStudent', addNewStudentRoutes)
router.post('/addNewStudent', addNewStudentRoutes)

/**Search Student */
router.get('/searchStudentIndex', searchStudentRoutes)
router.get('/searchStudentPage', searchStudentRoutes)

/**Edit Student */
router.get('/editStudent/:id', editStudentRoutes)
router.post('/editStudent/:id', editStudentRoutes)

/**Delete Student */
router.delete('/deleteStudent', deleteStudentRoutes)
module.exports = router
