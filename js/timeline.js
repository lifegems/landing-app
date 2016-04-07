var Timeline = (function Timeline() {

   var service = {
      loadTimeline: loadTimeline
   };

   /**
    * FUNCTIONS
    */
   function addEventTypeColors() {
      var aEventColors = [
         {"type": "PAT","color": "gray"},
         {"type": "EVT","color": "red"}
      ];

      $.each(aEventColors, function() {
         var strSearchTerm = "[id^='" + this.type + "'] > .tl-timemarker-content-container";
         $(strSearchTerm).css('backgroundColor', this.color);
      });
   }

   function listEvents() {
      var json = {
         "title": {
            "text": {
               "headline": "Lifespans of mankind",
               "text": "From Adam until today"
            }
         }
      };

      json.events = EVENTS.PATRIARCHS;

      return json;
   }

   function loadTimeline() {
      var event_json = listEvents();
      window.timeline = new TL.Timeline('timeline', event_json, {
         "timenav_height_percentage": 90
      });
      hideSlider();
      addEventTypeColors();


      $(".tl-timemarker").on('click', function(e) {
         var id = $(this).prop('id').substr(0, 6);
         var item = $.grep(EVENTS.PATRIARCHS, function(d) {
            return d.unique_id === id;
         });

         var title = item[0].text.headline + " (" + item[0].text.span + ")";
         $('.details--title').text(title);

         $('.details--content').text("");

         var $section = $('<div></div>', {class: "details--section"});
         $section.text(item[0].text.details);
         $('.details--content').append($section);

         $('.toolbar--details').show();
      });
   }

   function hideSlider() {
      $('.tl-storyslider').hide();

      // hide advert
      $('.tl-attribution').remove();

      var $menu = $('.tl-menubar');
      $('.toolbar').append($menu.children());
   }

   /**
    * EVENTS
    */
   $(".details--expand").on('click', function(e) {
      $('.toolbar--details').hide();
   });

   return service;
})();