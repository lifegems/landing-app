var Main = (function Main() {
   'use strict';

   var service = {
      construct: construct
   };

   function construct() {
      Menu.hideMenuOnDesktop();
      var strPage = window.location.hash.substr(1);
      VC.loadPage(strPage);
   }

   return service;
})();

var VC = (function() {
   function VC() {

   }

   VC.prototype.user = "";

   VC.loadPage = function(strPageName) {
      Menu.removeActive();
      switch (strPageName) {
         case "error":
            Menu.setTitle("ERROR");
            $('.content').load("404.html");
            break;
         case "timeline":
            Menu.setTitle("Bible Timeline");
            Menu.addActiveToPage("timeline");
            $('.content').load("timeline.html", function() {
               Timeline.loadTimeline();
               Timeline.loadEvents();
            });
            break;
         case "reading":
            Menu.setTitle("Daily Bible Reading");
            Menu.addActiveToPage("reading");
            $('.content').load("reading.html", function() {
               var BBV = new BibleBooksView("#biblebooksview");
            });
            break;
         default:
            Menu.setTitle("Choose a gem");
            Menu.addActiveToPage("home");
            $('.content').load("home.html");
            break;
      }
   }

   $(window).on('hashchange', function(e) {
      var strPage = window.location.hash.substr(1);
      VC.loadPage(strPage);
   });

   return VC;
})();

$(document).ready(function() {
   Main.construct();
   var user = localStorage.getItem('user');
   $(".mainmenu--username").val(user);
   VC.user = user;
   $('.mainmenu--loginBtn').click(function(e) {
      var strUserName = $(".mainmenu--username").val();
      localStorage.setItem('user', strUserName);

      $(".mainmenu--username").remove();
      $(".mainmenu--loginBtn").remove();
      var $username = $("<div></div>", {class: 'mainmenu--username'});
      $username.text(strUserName);
      $('.mainmenu--login').append($username);
   });
});