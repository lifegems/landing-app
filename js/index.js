var Main = (function Main() {
   'use strict';

   var service = {
      construct: construct
   };

   function construct() {
      Menu.hideMenuOnDesktop();
      Timeline.loadTimeline();
   }

   return service;
})();

Main.construct();