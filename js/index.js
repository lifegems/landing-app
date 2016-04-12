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

   VC.loadPage = function(strPageName) {
      switch (strPageName) {
         case "error":
            $('.content').load("404.html");
            break;
         case "timeline":
            $('.content').load("timeline.html", function() {
               Timeline.loadTimeline();
               Timeline.loadEvents();
            });
            break;
         default:
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

Main.construct();