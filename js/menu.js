var Menu = (function Menu(){
   var service = {
      hideMenuOnDesktop: hideMenuOnDesktop,
      removeActive: removeActive,
      addActiveToPage: addActiveToPage,
      hideMenu: hideMenu,
      openMenu: openMenu
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
   
   function hideMenu() {
      $('.mainmenu--expand').html("<i class='fa fa-bars'></i>");
      $(".mainmenu--item").addClass("is-hidden");
      isMenuExpanded = false;
   }
   
   function openMenu() {
      $('.mainmenu--expand').html("<i class='fa fa-chevron-up'></i>");
      $(".mainmenu--item").removeClass("is-hidden");
      isMenuExpanded = true;
   }

   /**
    * EVENTS
    */
   var isMenuExpanded = false;

   $(".mainmenu--expand").click(function(e) {
      if (isMenuExpanded === false) {
         openMenu();
      } else {
         hideMenu();
      }
   });

   return service;
})();