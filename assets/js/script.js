// Pseudocode
// current day display at the top of the calendar
// present timeblock for standard hour(HTML)
// event listener for savebtn
// apply style for past, present and future
// save localstorage
// retrieve from localstorage
$(function () {
  var currentDate = dayjs().format('dddd, MMMM D, YYYY'); 
  $('#currentDay').text(currentDate);
  $('.saveBtn').on('click', function () {
    var description = $(this).siblings('.description').val().trim(); 
    var timeBlockId = $(this).parent().attr('id'); 
    localStorage.setItem(timeBlockId, description);
  });

  var storedDate = localStorage.getItem('currentDate');
  console.log(storedDate);
  if (currentDate !== storedDate) {
    localStorage.clear(); 
    localStorage.setItem('currentDate', currentDate);
  }

  var currentHour = dayjs().format('H'); 
  $('.time-block').each(function () {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    if (timeBlockHour < currentHour) {
      $(this).removeClass('present future').addClass('past'); 
    } else if (timeBlockHour == currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else if (timeBlockHour > currentHour) {
      $(this).removeClass('past present').addClass('future'); 
    }
  });

  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription) {
      $(this).find('.description').val(savedDescription);
    }
  });
});
