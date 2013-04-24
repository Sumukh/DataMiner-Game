var lockLocations = [[100, 600], [120, 150], [200, 170], [136, 270], [311, 312], [229, 358], [621, 412], [808, 307], [480, 376], [415, 486], [274, 497]];

var imageLocations = [
  'https://mw2.google.com/mw-panoramio/photos/small/6494864.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/3235892.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/63187853.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/48096869.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/17535955.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/47598139.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/54841364.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/86420614.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/63440875.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/249265.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/40040176.jpg',
  'https://mw2.google.com/mw-panoramio/photos/small/9686682.jpg',
];

var curImage = 0;
var curBandwidth = 5;
var curPoints = 100;

var lockString = "";
for (var i = 0; i < lockLocations.length; i++) {
  lockString = lockString + '<div class="circle lock" style="left: ' + lockLocations[i][0] + 'px; top: ' + lockLocations[i][1] + 'px;"></div>';
}

function decrementBandwidth() {
  curBandwidth--;
  $("#bandwidth span").html(curBandwidth);
}

function incPoints(amt) {
  curPoints += amt;
  $("#points span").html(curPoints);
}

$(document).ready(function() {
  $('body').append(lockString);
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
 

  $('.lock').click(function() {
    if (curBandwidth != 0) {
      $(this).removeClass('lock');
      $(this).addClass('image');
      $(this).css("background-image", "url('" + imageLocations[curImage] + "')");
      curImage++;
      decrementBandwidth();
      incPoints(10);
    }
  }); 
});
