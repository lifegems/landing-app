var Timeline = (function Timeline() {

   var service = {
      loadTimeline: loadTimeline
   };

   /**
    * FUNCTIONS
    */
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



      $(".tl-timemarker").on('click', function(e) {
         var id = $(this).prop('id').substr(0, 6);
//         alert(id);
         
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