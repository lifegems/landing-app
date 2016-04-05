var Timeline = (function Timeline() {

   var service = {
      loadTimeline: loadTimeline
   };

   /**
    * FUNCTIONS
    */
   function getEvent(intID, strColor) {
         var tag = "tag_" + intID;
         var $newevent = $("<td></td>", {id: tag, class: "events--event"});
         var date = "event " + intID;
         $newevent.text(date);

         $newevent.css('backgroundColor', strColor);

         if (intID === 3) {
            $newevent.attr('colspan', 2.5);
         }

         $newevent.click(function(e) {
            var tag = "#" + $(this).attr('id') + "_content";
            $('.toolbar--details').show();
         });

         return $newevent;
   }

   function getEventRow(strColor, intRowID) {
      var $eventrow = $("<tr></tr>", {class: "events--row"});
      for (var i = 0; i < 5; i++) {
         var $newevent = getEvent(i, strColor);
         $eventrow.append($newevent);
      };
      return $eventrow;
   }

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

   /**
    * EVENTS
    */

   /**
    * Search for events in the timeline
    */
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

   $(".details--expand").on('click', function(e) {
      $('.toolbar--details').hide();
   })

   /**
    * Open select a year box
    */
   $('.toolbar--year').on('click', function(e) {
      if ($('.toolbar--selectyear').css('display') === 'none') {
         $('.toolbar--selectyear').css('display', 'block');
      } else {
         $('.toolbar--selectyear').css('display', 'none');
      }
   });

   /**
    * Zoom in on events to see a more detailed view
    */
   $('.toolbar--zoom--in').on('click', function(e) {
      var width = $('.date--span').css('width');
      var width = width.substr(0, width.length - 2);
      $('.date--span').css('width', width * 1.5);
   });

   /**
    * Zoom out on events to see a broader range of events
    */
   $('.toolbar--zoom--out').on('click', function(e) {
      var width = $('.date--span').css('width');
      var width = width.substr(0, width.length - 2);
      $('.date--span').css('width', width * 0.67);
   });

   /**
    * Select a year to navigate to
    */
   $('.toolbar--selectyear').on('change', function(e) {
      $('.toolbar--selectyear').css('display', 'none');
   })

   return service;
})();