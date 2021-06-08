
$(function() {
  var isMobile;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;

    // Mobile height fix
    $('.height-fix').each(function() {
      var h = $(this).height();
      $(this).height(h);
    });
  }

  // RESIZE RESETS
  $(window).resize(function() {
    posFilterBar($('.filter').first());
  });

  // Sticky Nav on Mobile
  if (isMobile) {
    $('nav').addClass('fixed');
  } else {
    $('nav').addClass('desk');
  }

  // NAV POSITION
  var navPos = $('nav').position().top;
  var lastPos = 0;
  var lockTimer;

  $(window).on('scroll', function() {
    var pos = $(window).scrollTop();
    var pos2 = pos + 50;
    var scrollBottom = pos + $(window).height();

    if (!isMobile) {
      if (pos >= navPos + $('nav').height() && lastPos < pos) {
        $('nav').addClass('fixed');
      }
      if (pos < navPos && lastPos > pos) {
        $('nav').removeClass('fixed');
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $('#home').offset().top) {
      highlightLink('home');
    }
    if (pos2 > $('#about').offset().top) {
      highlightLink('about');
    }
    if (pos2 > $('#portfolio').offset().top) {
      highlightLink('portfolio');
    }
    if (pos2 > $('#blog').offset().top) {
      highlightLink('blog');
    }
    if (
      pos2 > $('#contact').offset().top ||
      pos + $(window).height() === $(document).height()
    ) {
      highlightLink('contact');
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if (!$('body').hasClass('disable-hover')) {
      $('body').addClass('disable-hover');
    }

    lockTimer = setTimeout(function() {
      $('body').removeClass('disable-hover');
    }, 500);
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');
  }

  // EVENT HANDLERS
  $('.page-link').click(function() {
    var anchor = $(this).attr('dest');
    $('.link-wrap').removeClass('visible');

    $('nav span').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');

    $('html, body').animate(
      {
        scrollTop: $('#' + anchor).offset().top
      },
      400
    );
  });

  $('.fa-bars').click(function() {
    $('.link-wrap').toggleClass('visible');
  });

  $('.blog-wrap').hover(
    function() {
      $('.blog-wrap')
        .not(this)
        .addClass('fade');
      $(this).addClass('hover');
    },
    function() {
      $(this).removeClass('hover');
      $('.blog-wrap').removeClass('fade');
    }
  );

  posFilterBar($('.filter').first());

  $('.filter').click(function() {
    posFilterBar(this);
  });

  function posFilterBar(elem) {
    var origin = $(elem)
      .parent()
      .offset().left;
    var pos = $(elem).offset().left;
    $('.float-bar').css({
      left: pos - origin,
      width: $(elem).innerWidth()
    });
    $('.float-bar .row').css('left', (pos - origin) * -1);
  }

  // GALLERY
  $('#gallery').mixItUp({});

  function mixClear() {
    setTimeout(function() {
      $('#gallery').removeClass('waypoint');
    }, 2000);
  }

  // SCROLL ANIMATIONS
  function onScrollInit(items, elemTrigger) {
    var offset = $(window).height() / 2.6;
    items.each(function() {
      var elem = $(this),
        animationClass = elem.attr('data-animation'),
        animationDelay = elem.attr('data-delay');

      elem.css({
        '-webkit-animation-delay': animationDelay,
        '-moz-animation-delay': animationDelay,
        'animation-delay': animationDelay
      });

      var trigger = elemTrigger ? trigger : elem;

      trigger.waypoint(
        function() {
          elem.addClass('animated').addClass(animationClass);
          if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
        },
        {
          triggerOnce: true,
          offset: offset
        }
      );
    });
  }

  setTimeout(function() {
    onScrollInit($('.waypoint'));
  }, 10);

  // CONTACT FORM
  $('#contact-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: 'https://formspree.io/f/mleabqov',
      method: 'POST',
      data: { message: $('form').serialize() },
      dataType: 'json'
    }).done(function(response) {
      $('#success').addClass('expand');
      $('#contact-form')
        .find('input[type=text], input[type=email], textarea')
        .val('');
    });
  });

  $('#close').click(function() {
    $('#success').removeClass('expand');
  });
});




(function() {

	var SkillsBar = function( bars ) {
		this.bars = document.querySelectorAll( bars );
		if( this.bars.length > 0 ) {
			this.init();
		}
	};

	SkillsBar.prototype = {
		init: function() {
			var self = this;
			self.index = -1;
			self.timer = setTimeout(function() {
				self.action();
			}, 500);


		},
		select: function( n ) {
			var self = this,
				bar = self.bars[n];

				if( bar ) {
					var width = bar.parentNode.dataset.percent;

					bar.style.width = width;
					bar.parentNode.classList.add( "complete" );
				}
		},
		action: function() {
			var self = this;
			self.index++;
			if( self.index == self.bars.length ) {
				clearTimeout( self.timer );
			} else {
				self.select( self.index );
			}

			setTimeout(function() {
				self.action();
			},500);
		}
	};

	window.SkillsBar = SkillsBar;

})();

(function() {
	document.addEventListener( "DOMContentLoaded", function() {
		var skills = new SkillsBar( ".skillbar-bar" );
	});
})();



/*let elementsArray = document.querySelectorAll(".tile");
console.log(elementsArray);
window.addEventListener('scroll', fadeIn );
function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i]
        var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
            elem.classList.add("inView");
        } else {
            elem.classList.remove("inView");
        }
    }
}
fadeIn();
*/
const header = document.querySelector(".header")
const sectionThree = document.querySelector(".section3");

const faders =document.querySelectorAll(".fadeIn");
const slidersL = document.querySelectorAll(".slide-left")
const slidersR = document.querySelectorAll(".slide-right")

const sectionThreeOptions = {
  rootMargin:"-200px 0px 0px 0px"
};

const sectionThreeObserver = new IntersectionObserver(function(
  entries,
  sectionThreeObserver
){
  entries.forEach(entry =>{

    if(!entry.IsIntersecting){

      header.classList.add("inView");
    }else {
      header.classList.remove("inView");
    }
  });

},
sectionThreeOptions);

sectionThreeObserver.observe(sectionThree);


const appearOptions ={
  threshold:1,
  rootMargin:"0px 0px 200px 0px"
}

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
){
  entries.forEach(entry=> {
    if(!entry.isIntersecting){
      return;
    }else {
      entry.target.classList.add("inView")
      appearOnScroll.unobserve(entry.target);
    }

  });

},appearOptions)

faders.forEach(fader =>{
  appearOnScroll.observe(fader);
})

slidersL.forEach(slider => {
  appearOnScroll.observe(slider)

});
slidersR.forEach(slider => {
  appearOnScroll.observe(slider)

});
