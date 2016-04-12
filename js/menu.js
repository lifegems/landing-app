var Menu = (function Menu(){
   var service = {
      hideMenuOnDesktop: hideMenuOnDesktop,
      removeActive: removeActive,
      addActiveToPage: addActiveToPage
   };

   /**
    * FUNCTIONS
    */
   function hideMenuOnDesktop() {
      if ( $('.mainmenu--expand').css('display') === 'block') {
         $(".mainmenu--item").addClass("is-hidden");
      }
   }

   function removeActive() {
      $('[id^="menu--"]').removeClass("is-active");
   }

   function addActiveToPage(strPage) {
      var $menuItem = $('#menu--' + strPage).addClass("is-active");
   }

   /**
    * EVENTS
    */
   var isMenuExpanded = false;

   $(".mainmenu--expand").click(function(e) {
      if (isMenuExpanded === false) {
         $(this).html("<i class='fa fa-chevron-up'></i>");
         $(".mainmenu--item").removeClass("is-hidden");
         isMenuExpanded = true;
      } else {
         $(this).html("<i class='fa fa-bars'></i>");
         $(".mainmenu--item").addClass("is-hidden");
         isMenuExpanded = false;
      }
   });

   return service;
})();