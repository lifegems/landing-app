(function() {
   var tl = new TimelineMax();
   tl.from("#pageTitle", 1, {x: "-=5000", ease: Elastic.easeOut});
   tl.from("#p-item-1", 0.7, {x: "-=5000", ease: Expo.easeOut}, 0.5);
   tl.from("#p-item-2", 0.7, {y: "-=5000", ease: Expo.easeOut}, 0.6);
   tl.from("#p-item-3", 0.7, {x: "+=5000", ease: Expo.easeOut}, 0.7);
   tl.from("#p-item-4", 0.7, {y: "+=5000", ease: Expo.easeOut}, 0.8);
   tl.from("#p-item-5", 0.7, {y: "+=5000", ease: Expo.easeOut}, 0.9);

   $(".portfolio-item").hover(function(e) {
      TweenMax.to($(this), 0.5, {scale: 1.1});
   }, function(e) {
      TweenMax.to($(this), 0.5, {scale: 1});
   });
   $(".portfolio-item").on('click', function(e) {
      TweenMax.to($(this), 0.3, {scale: 0.5, x: "+=500", y: "-=500"});
   });
})();