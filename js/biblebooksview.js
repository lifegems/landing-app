var BibleBooksView = (function() {
   var self = this;
   self.strContainer = "";

   function BibleBooksView(strContainer) {
      self.strContainer = strContainer;
      self.DB = new DB(
         "https://api.mlab.com/api/1/databases/lifegems/collections/",
         "CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ"
      );
      displayAllBooks();
   }

   function getChapterButton(strName) {
      var $chapter = $('<div></div>', {class: "chapters--item"});
      $chapter.text(strName);
      $chapter.click(function(e) {
         if ($(this).hasClass("chapters--complete") === true) {
            $(this).removeClass("chapters--complete");
         } else {
            $(this).addClass("chapters--complete");
         }
      });
      return $chapter;
   }

   function getBookName(strBookName) {
      var $title = $('<div>', {class: 'book--title'});
      $title.text(strBookName);
      return $title;
   }

   function listChapters(intCount, strCode) {
      var $chapters = $('<div>', {class: 'chapters'});
      for (var i = 1; i <= intCount; i++) {
         var $chapter = getChapterButton(i);
         $chapter.attr('data-group', strCode);
         $chapters.append($chapter);
      }
      var $finish = getChapterButton("ALL");
      $finish.attr('data-group', strCode);
      $finish.attr('data-done', 'false');
      $finish.click(function(e) {
         if ($(this).attr('data-done') === 'true') {
            $(this).attr('data-done', 'false');
            $('[data-group='+strCode+']').removeClass('chapters--complete');
         } else {
            $(this).attr('data-done', 'true');
            $('[data-group='+strCode+']').addClass('chapters--complete')
         }
      });
      $chapters.append($finish);
      return $chapters;
   }

   function getIconColor(intIndex) {
      var color = "blue";
      if ($.inArray(intIndex, [0,1,2,3,4,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,65]) !== -1) {
          color = "#3B3547";
      } else if ($.inArray(intIndex, [5,6,7,8,9,10,11,12,13,14,15,16,43]) !== -1) {
          color = "#746B84";
      } else if ($.inArray(intIndex, [17,18,19,20,21,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]) !== -1) {
          color = "#544C63";
      }
      return color;
   }

   function displayAllBooks() {
      self.DB.get("BibleBooks", "&s={_id:1}").then(function(data) {
         $.each(data, function(i, d) {
            var $BkIcon = $("<div></div>", {id: d.BookCode, class: "book--icon"});
            $BkIcon.text(d.BookCode);
            var color = getIconColor(i);
            $BkIcon.css('background-color', color);
            $BkIcon.click(function(e) {
               var id = '#' + $(this).attr('id') + '-s';
               if ($(id).hasClass('is-hidden')) {
                  $("[id$='-s']").addClass('is-hidden');
                  $(".book--icon").removeClass('selected');
                  $(this).addClass('selected');
                  $(id).removeClass('is-hidden');
               } else {
                  $(this).removeClass('selected');
                  $(id).addClass('is-hidden');
               }
            });

            var $ChapSection = $("<div></div>", {id: d.BookCode + "-s",class: "book--section is-hidden"});
            var $BookName = getBookName(d.BookName);
            var $Chapters = listChapters(d.Chapters, d.BookCode);
            $ChapSection.append($BookName);
            $ChapSection.append($Chapters);

            var $Book = $("<div></div>", {class:"book"});
            $Book.append($BkIcon);
            $Book.append($ChapSection);

            if (i === 0) {
               var $hebHeading = $("<h3>", {class:'book--heading'});
               $hebHeading.text("HEBREW SCRIPTURES");
               $(self.strContainer).append($hebHeading);
            }
            if (i === 39) {
               var $grkHeading = $("<h3>", {class:'book--heading'});
               $grkHeading.text("CHRISTIAN GREEK SCRIPTURES");
               $(self.strContainer).append($grkHeading);
            }
            $(self.strContainer).append($Book);
         });
      });
   }

   return BibleBooksView;
})();