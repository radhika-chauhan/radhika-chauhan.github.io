// Event Configuration
const events = [
    {
        name: 'First Event',
        startTime: new Date('2024-11-26T14:00:00-05:00'), // EST start time
        endTime: new Date('2024-11-26T16:00:00-05:00')    // EST end time
    },
    {
        name: 'Second Event',
        startTime: new Date('2024-12-01T10:00:00-05:00'), // Another event start time
        endTime: new Date('2024-12-01T12:00:00-05:00')    // Another event end time
    }
];

function updateCurrentTime() {
    const now = new Date();
    const currentEST = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    
    const timeElement = document.getElementById('currentTime');
    
    // Format options for full date and time
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/New_York'
    };
    
    const formattedTime = currentEST.toLocaleString('en-US', options);
    
    if (timeElement) {
        timeElement.textContent = formattedTime;
    }
    
    return currentEST;
}

function checkEventStatus() {
    const currentEST = updateCurrentTime();
    
    // Find the first ongoing event
    const ongoingEvent = events.find(event => 
        currentEST >= event.startTime && currentEST <= event.endTime
    );
    
    const body = document.body;
    const statusElement = document.getElementById('status');

    if (ongoingEvent) {
        body.style.backgroundColor = 'rgba(72, 140, 92, 1)';
        statusElement.textContent = 'yes';
        // Uncomment the line below if you want to show the event name
        // statusElement.textContent = `YES - ${ongoingEvent.name} is ongoing`;
    } else {
        body.style.backgroundColor = 'rgba(72, 120, 140, 1)';
        statusElement.textContent = 'no';
    }
}

// Check status and update time immediately and then every second
document.addEventListener('DOMContentLoaded', () => {
    checkEventStatus();
    setInterval(checkEventStatus, 60000);
    
    // Update time every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});