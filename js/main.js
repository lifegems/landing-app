var VIEW = "";
var ctrl = new ScrollMagic.Controller();

var height = ctrl.info('size') / 2;

var intPhrase = 0;

var STORY = [
   {
      "LINE": "Hi I am Aaron, Moses' brother.",
      "ANIME": {
         "PHONE"  : [],
         "TABLET" : [],
         "DESKTOP": []
      }
   },
   {
      "LINE": "I served as the first high priest for the Israelites.",
      "ANIME": {
         "PHONE"  : [],
         "TABLET" : [],
         "DESKTOP": []
      }
   },
   {
      "LINE": "I'm here to tell you about some of the sacrifices I learned to prepare for Jehovah God.",
      "ANIME": {
         "PHONE"  : [],
         "TABLET" : [],
         "DESKTOP": []
      }
   },
   {
      "LINE": "Welcome to the tabernacle. Let's get started.",
      "ANIME": {
         "PHONE"  : [],
         "TABLET" : [],
         "DESKTOP": ["MOVE_PRIEST_LEFT", "MOVE_SPEECH_LEFT"]
      }
   }
];

function setScreenWidthSettings(intScreenWidth) {
   if (intScreenWidth < 769 ) {
      VIEW = "PHONE";
   } else if (intScreenWidth < 1025) {
      VIEW = "TABLET";
   } else {
      VIEW = "DESKTOP";
   }
}

function getAnimeType(ANIME) {
   var aAnime = [];
   if (VIEW === "PHONE") {
      aAnime = ANIME.PHONE;
   } else if (VIEW === "TABLET") {
      aAnime = ANIME.TABLET;
   } else if (VIEW === "DESKTOP") {
      aAnime = ANIME.DESKTOP;
   }
   return aAnime;
}

function loadAnimations(anime) {
   for (var i = 0; i < anime.length; i = i + 1) {
      if (anime[i] === "MOVE_PRIEST_LEFT") {
         TweenMax.to("#aaron", 1, {x: "-=500"});
      }
      if (anime[i] === "MOVE_SPEECH_LEFT") {
         TweenMax.to(".thought-bubble", 1, {x: "-=500"});
      }
      if (anime[i] === "MOVE_PRIEST_RIGHT") {
         TweenMax.to("#aaron", 1, {x: "+=500"});
      }
      if (anime[i] === "MOVE_SPEECH_RIGHT") {
         TweenMax.to(".thought-bubble", 1, {x: "+=500"});
      }
   }
}

function speak(strWords) {
   $(".speech").text(strWords);
   TweenMax.from(".speech", 1, {alpha: 0, y: "+=50"});
}

function main() {
   setScreenWidthSettings(screen.width);
   // initiate speech
   speak(STORY[intPhrase].LINE);
}
main();

$('.nextphrase').on('click', function(e) {
   if (intPhrase === -1) {
      var anime = {
         "PHONE": [],
         "TABLET": [],
         "DESKTOP": ["MOVE_PRIEST_RIGHT", "MOVE_SPEECH_RIGHT"]
      };
      var animetype = getAnimeType(anime);
      loadAnimations(animetype);
   }
   intPhrase = intPhrase + 1;
   if (intPhrase < STORY.length) {
      speak(STORY[intPhrase].LINE);

      var anime = getAnimeType(STORY[intPhrase].ANIME);
      loadAnimations(anime);
   } else {
      speak("Click 'more' to start again.");
      intPhrase = -1;
   }
});