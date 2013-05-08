
  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '331036450352653', // App ID
      channelUrl : '//www.sumukh.github.io/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional init code here
FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    picture();
  } else if (response.status === 'not_authorized') {
    //call login. 
  } else {

    //call login. 
     //   
  }
 });

  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "http://connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));

  var totalpiecesofdata = 0;

  var posts = [];

var photos_array = [];
var photos_url = [];

var photos_with_locations = [];
var photo_locations = [];
function get_photos(){
  var fbid = store.id;

function getphotos(){
 var url = '/me?fields=photos.limit(100).type(tagged).fields(name,name_tags,source,picture,place,icon)';
          

                        console.log("Checking: " + url);
                        FB.api(url, function(response) {
                      console.log(response.photos.data);

                            for(var k in response.photos.data) {
                                    photos_array.push(response.photos.data[k]);
                                    photos_url.push(response.photos.data[k].source);
if(response.photos.data[k].place){
console.log(response.photos.data[k].place);
  photos_with_locations.push(response.photos.data[k].source);
  photo_locations.push([response.photos.data[k].place.location.latitude,response.photos.data[k].place.location.longitude]);
}
                                    

}

});

                      
}


function getposts(){
  var fbid = store.id;

                console.time('all posts');

                var url = '/me/feed?limit=500';
                var finished = false;
                var c = 0, totalLikes = 0;
                var timer = setInterval(function () {

                    if(url != '') {
                        console.log("Checking: " + url);
                        FB.api(url, function(response) {
                            //console.log("Got " + response.data.length + " items");

                            //c += response.data.length;

                            // calculate total likes
                            for(var k in response.data) {
                                      totalpiecesofdata++;

                                c++;
                                if(response.data[k].from.id == fbid) {
                                    console.log(response.data[k]);
                                    posts.push(response.data[k].story)
                                }

                          }
                        });
                        url = '';
                    } else {
                         //console.log("Skipped iteration");
                    }
                }, 1000);
}



function login() {
    FB.login(function(response) {
        if (response.authResponse) {
          testAPI();
           //window.location = 'index.html';
        } else {
            // cancelled
        }
    }, {perms:'read_stream,user_about_me,user_photos,friends_about_me,user_likes,user_education_history,user_work_history,user_location'});
}
        var store = 1;
        var school = 1;

function picture() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
                            for(var k in response.data) {
                                      totalpiecesofdata++;
                                    }
        console.log(response);
        store = response;
        school = store.education[store.education.length - 1].school
       //not actually function for home page
        $('.map').css("background-image", "url(http://maps.googleapis.com/maps/api/staticmap?center="+escape(store.location.name)+"&zoom=10&size="+$('.map').height()+"x"+$('.map').width()+"&maptype=roadmap&sensor=false)");

        $('.school').css("background-image", "url(http://graph.facebook.com/"+escape(school.id)+"/picture?type=large)");  
        $('.fb_profilepic').css("background-image", "url(http://graph.facebook.com/"+escape(store.id)+"/picture)");  
        $('.login_link').html("Target: "+store.name);  
    });


}
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
                                  for(var k in response.data) {
                                      totalpiecesofdata++;
                                    }
        alert('Welcome Miner #: ' + response.id + '.\nAccording to our records you also go by ' + response.name + '.');
        console.log(response);
        store = response;

        $('.map').css("background-image", "url(http://maps.googleapis.com/maps/api/staticmap?center="+escape(store.location.name)+"&zoom=10&size="+$('.map').height()+"x"+$('.map').width()+"&maptype=roadmap&sensor=false)");

        $('.school').css("background-image", "url(http://graph.facebook.com/"+escape(school.id)+"/picture?type=large)");  
        $('.fb_profilepic').css("background-image", "url(http://graph.facebook.com/"+escape(store.id)+"/picture)");  
        $('.login_link').html(store.name); 
        getphotos();
        getposts(); 

    });


}
