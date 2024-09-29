const activityService = require('../services/activityService');

exports.listActivities = async (req, res) => {
  try {
    const activities = await activityService.getAllActivities();
    res.render('activities/index', { activities });
  } catch (error) {
    res.status(500).render('error', { error: 'Error fetching activities' });
  }
};

exports.addActivity = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    if (!title || !date || !description) {
      return res.status(400).render('activities/index', { 
        activities: await activityService.getAllActivities(),
        error: 'All fields are required'
      });
    }
    await activityService.addActivity(req.body);
    res.redirect('/');
  } catch (error) {
    console.error('Error adding activity:', error);
    res.status(500).render('activities/index', { 
      activities: await activityService.getAllActivities(),
      error: 'Error adding activity'
    });
  }
};
exports.completeActivity = async (req, res) => {
  try {
    await activityService.completeActivity(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).render('error', { error: 'Error completing activity' });
  }
};


exports.getEditActivity = async (req, res) => {
  try {
    const activity = await activityService.getActivityById(req.params.id);
    if (!activity) {
      return res.status(404).render('error', { error: 'Activity not found' });
    }
    res.render('activities/edit', { 
      activity, 
      title: 'Edit Activity',
      layout: 'layout'  
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).render('error', { error: 'Error fetching activity' });
  }
};

exports.postEditActivity = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    if (!title || !date || !description) {
      const activity = await activityService.getActivityById(req.params.id);
      return res.status(400).render('activities/edit', { 
        activity,
        error: 'All fields are required',
        title: 'Edit Activity',
        layout: 'layout'  
      });
    }
    await activityService.updateActivity(req.params.id, req.body);
    res.redirect('/');
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).render('error', { error: 'Error updating activity' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    await activityService.deleteActivity(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).render('error', { error: 'Error deleting activity' });
  }
};


exports.sendReminder = async (req, res) => {
  try {
    const activity = await activityService.getActivityById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    console.log(`Reminder email sent for activity: ${activity.title}`);
        // await emailService.sendReminderEmail(activity);
        // Send a success response
        res.json({ message: `Reminder sent for activity: ${activity.title}` });

    res.redirect('/');
  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(500).render('error', { error: 'Error sending reminder' });
  }
};