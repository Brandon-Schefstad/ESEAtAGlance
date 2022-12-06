const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { ensureAuth } = require('../middleware/auth');

router.get(
	'/addAccommodations',
	ensureAuth,
	studentController.addAccommodations
);
router.get(
	'/addAccommodations/:id',
	ensureAuth,
	studentController.addAccommodationsLoaded
);
router.post(
	'/addAccommodations',
	ensureAuth,
	studentController.postAccommodations
);

router.get(
	'/loadAccommodations',
	ensureAuth,
	studentController.loadAccommodations
);
