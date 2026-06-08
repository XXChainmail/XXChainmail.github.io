// Parse URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the event name from URL
var eventName = getUrlParameter('event');

// Find the event in the calendar data
function findEvent(name) {
  if (!window.calendarEvents) {
    return null;
  }
  
  for (var i = 0; i < window.calendarEvents.length; i++) {
    if (window.calendarEvents[i].eventName === name) {
      return window.calendarEvents[i];
    }
  }
  return null;
}

// Display event details
function displayEventDetails() {
  var event = findEvent(eventName);
  var detailsDiv = document.getElementById('eventDetails');
  
  if (!event) {
    detailsDiv.innerHTML = '<p class="error">Event not found.</p>';
    return;
  }
  
  var dateObj = moment(event.date);
  var formattedDate = dateObj.format('MMM Do');
  
  var linkHref = (event.pageId && event.pageId.length) ? event.pageId : '/events/';

  var html = '<div class="event-card">' +
    '<div class="event-title">' + event.eventName + '</div>' +
    '<div class="event-section">' +
      '<div class="section-label">Date:</div>' +
      '<div class="section-content">' + formattedDate + '</div>' +
    '</div>' +
    '<div class="event-section">' +
      '<div class="section-label">Time:</div>' +
      '<div class="section-content">' + event.time + '</div>' +
    '</div>' +
    '<div class="event-section">' +
      '<div class="section-label">Location:</div>' +
      '<div class="section-content">' + event.location + '</div>' +
    '</div>' +
    '<a href="' + linkHref + '" target="_top" class="event-link">View Full Details →</a>' +
    '</div>';
  
  detailsDiv.innerHTML = html;
}

// Load event details when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', displayEventDetails);
} else {
  displayEventDetails();
}
