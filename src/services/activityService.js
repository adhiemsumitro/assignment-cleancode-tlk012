const fs = require('fs').promises;
const path = require('path');

const dataFile = path.join(__dirname, '../data/activities.json');

exports.getAllActivities = async () => {
  const data = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(data);
};

exports.addActivity = async (activity) => {
  const activities = await this.getAllActivities();
  activities.push({ ...activity, id: Date.now(), isCompleted: false });
  await fs.writeFile(dataFile, JSON.stringify(activities, null, 2));
};

exports.completeActivity = async (id) => {
  const activities = await this.getAllActivities();
  const index = activities.findIndex(a => a.id === parseInt(id));
  if (index !== -1) {
    activities[index].isCompleted = true;
    await fs.writeFile(dataFile, JSON.stringify(activities, null, 2));
  }
};

exports.getActivityById = async (id) => {
  const activities = await this.getAllActivities();
  return activities.find(activity => activity.id === parseInt(id));
};

exports.updateActivity = async (id, updatedActivity) => {
  const activities = await this.getAllActivities();
  const index = activities.findIndex(activity => activity.id === parseInt(id));
  if (index !== -1) {
    activities[index] = { ...activities[index], ...updatedActivity, id: parseInt(id) };
    await fs.writeFile(dataFile, JSON.stringify(activities, null, 2));
  }
};

exports.deleteActivity = async (id) => {
  let activities = await this.getAllActivities();
  activities = activities.filter(activity => activity.id !== parseInt(id));
  await fs.writeFile(dataFile, JSON.stringify(activities, null, 2));
};