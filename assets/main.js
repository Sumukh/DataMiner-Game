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

function initialize() {
    var myLatLng = new google.maps.LatLng(37.875058,-122.260065);
    var stad = new google.maps.LatLng(37.870688,-122.250946);

    var mapOptions = {
      center: new google.maps.LatLng(37.871908,-122.258284),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var locations = 
    [
    ['Swimming', 37.868842,-122.262039, 7],
    ['Dorms', 37.867859,-122.255044, 6],
    ['Soda Hall', 37.875058,-122.260065, 5],
    ['Stadium', 37.870688,-122.250946, 4],
    ['LaVals Pizza', 37.875549,-122.26043, 3],
    ['Bongo', 37.875871,-122.260001, 2],
    ['Dwinelle', 37.870603,-122.260365, 1]
    ];

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(37.871908,-122.258284),
        map: map,
        draggable:false,
       animation: google.maps.Animation.DROP,
        title:"Center"
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        animation: google.maps.Animation.DROP,

        map: map
      });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      //Can also set your own HTML here.
      infowindow.setContent(locations[i][0] + " on 4/"+Math.floor(3+ Math.random() * 10)+" with "+Math.floor(1+ Math.random() * 4) +" friends <br> Loading Minigame ...");
      infowindow.open(map, marker);
      //marker.setAnimation(google.maps.Animation.BOUNCE);

      //LOAD THE MINI GAME HERE.               
      }
    })(marker, i));

  }
}

$(document).ready(function() {
  $('body').append(lockString);
  $("#header ul a").click(function() {
    $("#header ul a").removeClass("selected");
    $(this).addClass("selected");
    
    if ($(this).attr("id") == "map_link") {
      $("#map").show();
      google.maps.event.trigger(map, 'resize');
    } else {
      $("#map").hide();
    }
  });

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
 
  $('.circle').click(function() {
    if ($(this).hasClass('lock')) {
      return;
    }
    $("#map_link").click();
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
  ht = window.innerHeight - 61;
  $("#map").css({
    "height": ht + "px",
    "width": "100%",
    "top": "61px",
  });
  initialize();
  $("#map").hide();
});
