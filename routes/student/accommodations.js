const express = require('express');
const router = express.Router();
const accommodationsController = require('../../controllers/student/accommodations.js');
const { ensureAuth } = require('../../middleware/auth');

router.get(
	'/addAccommodations',
	ensureAuth,
	accommodationsController.addAccommodations
);
router.get(
	'/addAccommodations/:id',
	ensureAuth,
	accommodationsController.addAccommodationsLoaded
);
router.post(
	'/addAccommodations',
	ensureAuth,
	accommodationsController.postAccommodations
);

router.get(
	'/loadAccommodations',
	ensureAuth,
	accommodationsController.loadAccommodations
);
module.exports = router;
