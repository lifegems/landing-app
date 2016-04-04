(function () {
   'use strict';

   var isMenuExpanded = false;

   $(".mainmenu--expand").click(function(e) {
      if (isMenuExpanded === false) {
         $(this).html("<i class='fa fa-chevron-up fa-2x'></i>");
         $(".mainmenu--item").removeClass("is-hidden");
         isMenuExpanded = true;
      } else {
         $(this).html("<i class='fa fa-bars fa-2x'></i>");
         $(".mainmenu--item").addClass("is-hidden");
         isMenuExpanded = false;
      }
   });

   $(".date").click(function(e) {
      var setDate = $(this).text();
      $(".date.is-center").text(setDate);
      $(".date.is-left").text(parseInt(setDate) - 1);
      $(".date.is-right").text(parseInt(setDate) + 1);

   });

   if ( $('.mainmenu--expand').css('display') === 'block') {
      $(".mainmenu--item").addClass("is-hidden");
   }
})();