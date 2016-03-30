(function() {
   var tl = new TimelineMax();
   tl.from("#pageTitle", 1, {x: "-=5000", ease: Elastic.easeOut});
   tl.from("#p-item-1", 0.7, {x: "-=5000", ease: Expo.easeOut}, 0.5);
   tl.from("#p-item-2", 0.7, {y: "-=5000", ease: Expo.easeOut}, 0.6);
   tl.from("#p-item-3", 0.7, {x: "+=5000", ease: Expo.easeOut}, 0.7);
   tl.from("#p-item-4", 0.7, {y: "+=5000", ease: Expo.easeOut}, 0.8);
   tl.from("#p-item-5", 0.7, {y: "+=5000", ease: Expo.easeOut}, 0.9);
   tl.from("#p-item-6", 0.7, {x: "+=5000", ease: Expo.easeOut}, 1);
   tl.from("#p-item-7", 0.7, {x: "-=5000", ease: Expo.easeOut}, 1.1);
   tl.from("#p-item-8", 0.7, {y: "+=5000", ease: Expo.easeOut}, 1.2);

   $(".portfolio-item").hover(function(e) {
      TweenMax.to($(this), 0.5, {scale: 1.1});
   }, function(e) {
      TweenMax.to($(this), 0.5, {scale: 1});
   });
})();