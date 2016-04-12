var Timeline = (function Timeline() {

   var service = {
      loadTimeline: loadTimeline,
      loadEvents: loadEvents
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
         // $('.toolbar').append($MenuIcon);
         $('.tl-menubar').prepend($MenuIcon);

         // load all event types
         $EventTypes = $('.events--types');
         $.each(EVENTS['DETAILS'], function(_, d) {
            var id = "events--" + d.type;
            $evt = $('<div></div', {class: 'events--ckb'});
            $ckb = $('<input>', {type: 'checkbox', id: id});
            $lbl = $('<label></label>', {for: id});
            $lbl.text(" " + d.title);

            $evt.append($ckb);
            $evt.append($lbl);

            $EventTypes.append($evt);
         });
      }
   }

   function addEventTypeColors() {
      $.each(EVENTS['DETAILS'], function() {
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
         var detail = $.grep(EVENTS['DETAILS'], function(d) {
            return d.type === strEventType;
         });
         aEvents = aEvents.concat(EVENTS[detail[0].name]);
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
         var slide = window.timeline.getCurrentSlide().data;
         var id = slide.unique_id;
         var type = id.substr(0, 3);

         $('.details--title').text(slide.text.headline);

         var $section = $('<div></div>', {class: "details--section"});
         $section.html(slide.text.details);

         $('.details--content').text("");
         $('.details--content').append($section);

         $('.toolbar--details').show();
      });
   }

   function hideSlider() {
      $('.tl-storyslider').hide();

      // hide advert
      $('.tl-attribution').remove();
      $('.toolbar .tl-menubar-button').remove();

      // add nav buttons
      var $prev = $('<div class="tl-menubar-button"><span class="fa fa-chevron-left"></span></div>');
      // $('.toolbar').append($prev);
      $('.tl-menubar').append($prev);
      $prev.click(function(e) {
         window.timeline.goToPrev();
      });
      var $next = $('<div class="tl-menubar-button"><span class="fa fa-chevron-right"></span></div>');
      $next.click(function(e) {
         window.timeline.goToNext();
      });
      // $('.toolbar').append($next);
      $('.tl-menubar').append($next);

      // move menu toolbar
      // var $toolbar = $('.toolbar');
      // var $menu = $('.tl-menubar');
      // $menu.append($toolbar.children());
   }

   function hideEventSelector() {
      $('.toolbar--events').hide();
   }

   /**
    * EVENTS
    */

   function loadEvents() {
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
   }

   return service;
})();