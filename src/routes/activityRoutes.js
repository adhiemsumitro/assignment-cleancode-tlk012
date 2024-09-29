const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/', activityController.listActivities);
router.post('/add', activityController.addActivity);
router.post('/complete/:id', activityController.completeActivity);

router.get('/edit/:id', activityController.getEditActivity);
router.post('/edit/:id', activityController.postEditActivity);

router.post('/delete/:id', activityController.deleteActivity);

router.post('/sendReminder/:id', activityController.sendReminder);

module.exports = router;
