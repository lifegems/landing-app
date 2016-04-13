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
   
   function hideLoader() {
      $('.loader').hide();
   }

   VC.loadPage = function(strPageName) {
      $('.loader').show();
      Menu.removeActive();
      switch (strPageName) {
         case "error":
            $('.content').load("404.html");
            break;
         case "timeline":
            Menu.addActiveToPage("timeline");
            $('.content').load("timeline.html", function() {
               Timeline.loadTimeline();
               Timeline.loadEvents();
               setTimeout(hideLoader, 1000);
            });
            break;
         case "reading":
            Menu.addActiveToPage("reading");
            $('.content').load("reading.html", function() {
               var BBV = new BibleBooksView("#biblebooksview");
               setTimeout(hideLoader, 1000);
            });
            break;
         default:
            Menu.addActiveToPage("home");
            $('.content').load("home.html", function() {
               setTimeout(hideLoader, 1000);
            });
            break;
      }
   }

   $(window).on('hashchange', function(e) {
      Menu.hideMenu();
      var strPage = window.location.hash.substr(1);
      VC.loadPage(strPage);
   });

   return VC;
})();

$(document).ready(function() {
   Main.construct();
});