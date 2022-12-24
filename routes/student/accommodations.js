const express = require('express')
const router = express.Router()
const accommodationsController = require('../../controllers/student/accommodations.js')
const { ensureAuth } = require('../../middleware/auth')

router.get(
	'/addAccommodations',
	ensureAuth,
	accommodationsController.addAccommodations
)
router.get(
	'/getAccommodationsPage',
	ensureAuth,
	accommodationsController.addAccommodations
)
router.post(
	'/addAccommodations',
	ensureAuth,
	accommodationsController.postAccommodations
)

module.exports = router
