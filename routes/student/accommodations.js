const express = require('express')
const router = express.Router()
const accommodationsController = require('../../controllers/student/accommodations.js')
const { ensureAuth } = require('../../middleware/auth')

router.post(
	'/addNewAccommodations',
	ensureAuth,
	accommodationsController.postAccommodations
)

module.exports = router
