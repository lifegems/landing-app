var Timeline = (function Timeline() {

   var service = {
      loadTimeline: loadTimeline
   };

   var hasLoadedTL = false;
   var aDefaultSettings = ["PAT", "EVT", "BBL"];
   var aUserSettings = [];

   /**
    * FUNCTIONS
    */
   function addEventSelector() {
      var $MenuIcon = $('<span class="tl-menubar-button"><span class="fa fa-bars"></span></span>');
      $MenuIcon.click(function(e) {
         $('.toolbar--events').show();
      });
      if (hasLoadedTL !== true) {
         $('.toolbar').append($MenuIcon)
      }
   }

   function addEventTypeColors() {
      var aEventColors = [
         {"type": "PAT","color": "gray"},
         {"type": "EVT","color": "red"},
         {"type": "BBL","color": "#88b"},
         {"type": "JFW","color": "#45456E"}
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

      var aSettings = (aUserSettings.length > 0) ? aUserSettings : aDefaultSettings;
      var aEvents = [];
      $.each(aSettings, function(_, strEventType) {
         if (strEventType === "PAT") {
            aEvents = aEvents.concat(EVENTS.PATRIARCHS);
         }
         if (strEventType === "EVT") {
            aEvents = aEvents.concat(EVENTS.EVENTS);
         }
         if (strEventType === "BBL") {
            aEvents = aEvents.concat(EVENTS.BIBLEBOOKS);
         }
         if (strEventType === "JFW") {
            aEvents = aEvents.concat(EVENTS.JESUSFINALWK);
         }
      });
      json.events = aEvents;

      return json;
   }

   function loadTimeline() {
      var event_json = listEvents();
      window.timeline = new TL.Timeline('timeline', event_json, {
         "timenav_height_percentage": 90
      });
      hideSlider();
      hideEventSelector();
      addEventTypeColors();
      addEventSelector();

      $(".tl-timemarker").on('click', function(e) {
         var id = $(this).prop('id').substr(0, 7);
         var type = id.substr(0, 3);

         var aEvents = [];
         if (type === "PAT") {
            aEvents = EVENTS.PATRIARCHS;
         } else if (type === "EVT") {
            aEvents = EVENTS.EVENTS;
         } else if (type === "BBL") {
            aEvents = EVENTS.BIBLEBOOKS;
         } else if (type === "JFW") {
            aEvents = EVENTS.JESUSFINALWK;
         }
         // determine way to include all event types
         var item = $.grep(aEvents, function(d) {
            return d.unique_id === id;
         });

         $('.details--title').text(item[0].text.headline);

         $('.details--content').text("");
         var $section = $('<div></div>', {class: "details--section"});
         $section.html(item[0].text.details);
         $('.details--content').append($section);

         $('.toolbar--details').show();
      });
   }

   function hideSlider() {
      $('.tl-storyslider').hide();

      // hide advert
      $('.tl-attribution').remove();

      // move menu toolbar
      $('.toolbar .tl-menubar-button').remove();
      var $menu = $('.tl-menubar');
      $('.toolbar').append($menu.children());
   }

   function hideEventSelector() {
      $('.toolbar--events').hide();
   }

   /**
    * EVENTS
    */
   $(".details--expand").on('click', function(e) {
      $('.toolbar--details').hide();
   });

   $(".events--save").click(function(e) {
      aUserSettings = [];
      var $settingsCkb = $('[id^="events--"]');
      $.each($settingsCkb, function(_, d) {
         var strEventType = $(d).attr('id').substr(8);

         if ($(d).is(':checked') === true) {
            aUserSettings.push(strEventType);
         }
      });
      loadTimeline();

      $('.toolbar--events').hide();
   });

   return service;
})();