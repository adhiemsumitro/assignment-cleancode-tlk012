console.log('separate functions');

function sendReminder(activityId) {
    fetch(`/sendReminder/${activityId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending the reminder.');
        });
}

function filterActivities() {
    const filterDate = document.getElementById('filterDate').value;
    const activities = document.querySelectorAll('#activitiesList li');
    
    activities.forEach(activity => {
        if (activity.dataset.date === filterDate) {
            activity.style.display = '';
        } else {
            activity.style.display = 'none';
        }
    });
}

function showAllActivities() {
    const activities = document.querySelectorAll('#activitiesList li');
    activities.forEach(activity => {
        activity.style.display = '';
    });
    document.getElementById('filterDate').value = '';
}

