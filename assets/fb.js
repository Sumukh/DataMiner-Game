
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
function login() {
    FB.login(function(response) {
        if (response.authResponse) {
          testAPI();
           //window.location = 'index.html';
        } else {
            // cancelled
        }
    });
}
        var store = 1;

function picture() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log(response);
        store = response;
        $('.fb_profilepic').css("background-image", "url(http://graph.facebook.com/"+escape(store.id)+"/picture)");  
        $('.login_link').html(store.name);  
    });


}
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        alert('Welcome Miner #: ' + response.id + '.\nAccording to our records you also go by ' + response.name + '.');
        console.log(response);
        store = response;
        $('.fb_profilepic').css("background-image", "url(http://graph.facebook.com/"+escape(store.id)+"/picture)");  
        $('.login_link').html(store.name);  

    });


}
