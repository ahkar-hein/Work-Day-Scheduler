// Pseudocode
// current day display at the top of the calendar
// present timeblock for standard hour(HTML)
// event listener for savebtn
// apply style for past, present and future
// save localstorage
// retrieve from localstorage
$(function () {
  // Getting the current date by using dayjs
  var currentDate = dayjs().format('dddd, MMMM D, YYYY'); 
  // display the date in header.
  $('#currentDay').text(currentDate);
  // event listener click  for save button
  $('.saveBtn').on('click', function () {
    // Getting user input from textarea
    var description = $(this).siblings('.description').val().trim();
    // getting id of the parent time block.
    var timeBlockId = $(this).parent().attr('id'); 
    // save id and description into localstorage 
    localStorage.setItem(timeBlockId, description);
  });

  // declare the variable to get current date
  var storedDate = localStorage.getItem('currentDate');
  // if condition for current date not equal to storeDate
  if (currentDate !== storedDate) {
    localStorage.clear(); // Clear the localstorage.
    localStorage.setItem('currentDate', currentDate); // set the new currentDate after clear.
  }

  // Declare variable for currentHour by using dayjs 
  var currentHour = dayjs().format('H'); 
  $('.time-block').each(function () {
    // getting the exact hour from time block id 
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    if (timeBlockHour < currentHour) {
      // set the color if hours is last then current
      $(this).removeClass('present future').addClass('past'); 
    } else if (timeBlockHour == currentHour) {
      // set the color if hours is same as current
      $(this).removeClass('past future').addClass('present');
    } else if (timeBlockHour > currentHour) {
      // set the color if the hours is greater than current
      $(this).removeClass('past present').addClass('future'); 
    }
  });

  // retrive save data and display into textarea.
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription) {
      $(this).find('.description').val(savedDescription); //set the values of the textarea from the save data from localstorage.
    }
  });
});
