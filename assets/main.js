$(document).ready(function() {
  $('.circle').mouseout(function() {
    $(this).animate({
      opacity: 1,
    }, 500, function() { }
    );
  });
  $('.circle').mouseover(function() {
    $(this).animate({
      opacity: .50,
    }, 500, function() { }
    );
  });
});
