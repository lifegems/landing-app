var Main = (function Main() {
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

   function createEvent(intID, strColor) {
         var tag = "tag_" + intID;
         var $newevent = $("<td></td>", {id: tag, class: "events--event"});
         var date = "event " + intID;
         $newevent.text(date);

         $newevent.css('backgroundColor', strColor);

         var tagcontent = tag + "_content";
         var $content = $("<div></div>", {class: "events--content", id: tagcontent});
         $content.text("This is a bunch of text that can appear.");
         $newevent.append($content);
         if (intID === 3) {
            $newevent.attr('colspan', 2.5);
         }

         $newevent.click(function(e) {
            var tag = "#" + $(this).attr('id') + "_content";

            if (($(tag).css('display') === "none") === true) {
               $(tag).show();
            } else {
               $(tag).hide();
            }
         });

         // $eventrow.append($newevent);
         return $newevent;
   }

   function getEventRow(strColor, intRowID) {
      var $eventrow = $("<tr></tr>", {class: "events--row"});
      for (var i = 0; i < 5; i++) {
         var $newevent = createEvent(i, strColor);
         $eventrow.append($newevent);
      };
      return $eventrow;
   }

   $("#searchTimeline").keyup(function(e) {
      var regex = new RegExp($("#searchTimeline").val(), "i");
      var event = $(".events--event");
      event.each(function(index) {
         if ($(this).html().search(regex) != -1) {
            $(this).show();
         } else {
            $(this).hide();
         }
      });
   });

   $('.toolbar--year').on('click', function(e) {
      if ($('.toolbar--selectyear').css('display') === 'none') {
         $('.toolbar--selectyear').css('display', 'block');
      } else {
         $('.toolbar--selectyear').css('display', 'none');
      }
   });

   $('.toolbar--zoom--in').on('click', function(e) {
      var width = $('.date--span').css('width');
      var width = width.substr(0, width.length - 2);
      $('.date--span').css('width', width * 1.5);
   });

   $('.toolbar--zoom--out').on('click', function(e) {
      var width = $('.date--span').css('width');
      var width = width.substr(0, width.length - 2);
      $('.date--span').css('width', width * 0.67);
   });

   $('.toolbar--selectyear').on('change', function(e) {
      $('.toolbar--selectyear').css('display', 'none');
   })

   function getDatesRow() {
      var $dates = $("<tfoot></tfoot>", {class: ".timeline--dateline"});
      var $line = $("<tr></tr>");
      for (var i = 0; i < 15; i++) {
         var $footer = $("<th></th>", {class: "date"})
         var $date = $("<div></div>", {class: "date--span"});
         var date = 4027 - i;
         $date.text(date);
         $footer.append($date);

         $line.append($footer);
      }
      $dates.append($line);
      return $dates;
   }

   function loadTimeline() {
      var $tl = $(".timeline");
      if ($tl.length === 1) {
         // build date line
         var $dates = getDatesRow();

         // build events
         var $events = $("<tbody></tbody", {class: "events"});
            // each event type gets it's own row
         var colors = ["#AFC9D8", "#E8F7FF", "#BAD5E5", "#B6CBEF"];
         for (var i = 0; i < 15; i++) {
            var $eventsrow = getEventRow(colors[i % 4], i);
            $events.append($eventsrow);
         }

         // add to DOM
         $tl.append($events);
         $tl.append($dates)
      }
   }

   var publicAPI = {
      loadTimeline: loadTimeline
   };

   return publicAPI;
})();

Main.loadTimeline();