const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.js');
const { ensureAuth } = require('../middleware/auth');

// Method names are arbitary
router.get('/', ensureAuth, dashboardController.getDashboard);
// router.post('/addTime', ensureAuth, dashboardController.addTime);
// router.delete('/deleteTime', ensureAuth, dashboardController.deleteTime);

// Route to adding a new task object to the user
// router.post('/addTask', ensureAuth, dashboardController.addTask)
// router.put('/updateTask', ensureAuth, dashboardController.updateTask);

//export
module.exports = router;
