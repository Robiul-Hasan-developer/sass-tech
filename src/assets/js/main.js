(function ($) {
  "use strict";
  
  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
      
  // ============== Mobile Nav Menu Dropdown Js Start =======================
  function toggleSubMenu() {
    if ($(window).width() <= 991) {
      $('.has-submenu').off('click').on('click', function () {
        $(this).toggleClass('active').siblings('.has-submenu').removeClass('active').find('.nav-submenu').slideUp(300);
        $(this).find('.nav-submenu').stop(true, true).slideToggle(300);
      });
    } else {
      $('.has-submenu').off('click'); 
    }
  }

  toggleSubMenu();
  $(window).resize(toggleSubMenu);
  // ============== Mobile Nav Menu Dropdown Js End =======================
    
  // ===================== Scroll Back to Top Js Start ======================
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on('scroll', function() {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  })
  // ===================== Scroll Back to Top Js End ======================

  
// ========================== add active class to navbar menu current page Js Start =====================
  function dynamicActiveMenuClass(selector) {
    let FileName = window.location.pathname.split("/").reverse()[0];

    // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
    if (FileName === "" || FileName === "index.html") {
      // Keep the activePage class on the Home link
      selector.find("li.nav-menu__item.has-submenu").eq(0).addClass("activePage");
    } else {
      // Remove activePage class from all items first
      selector.find("li").removeClass("activePage");

      // Add activePage class to the correct li based on the current URL
      selector.find("li").each(function () {
        let anchor = $(this).find("a");
        if ($(anchor).attr("href") == FileName) {
          $(this).addClass("activePage");
        }
      });

      // If any li has activePage element, add class to its parent li
      selector.children("li").each(function () {
        if ($(this).find(".activePage").length) {
          $(this).addClass("activePage");
        }
      });
    }
  }

  if ($('ul').length) {
    dynamicActiveMenuClass($('ul'));
  }
// ========================== add active class to navbar menu current page Js End =====================


// ======================== Top Features Slider Start ==========================
if ($(".top-features-slider").length > 0) { 
  $('.top-features-slider').marquee({
    pauseOnHover: true,
    duplicated: true,
    allowCss3Support: true,
    css3easing: 'linear',
    easing: 'linear',
    delayBeforeStart: 0,
    duration: 24000,
    direction: $('html').attr('dir') === 'rtl' ? 'right' : 'left',
    gap: 32,
    pauseOnCycle: false,
    startVisible: true, 
  });
}
// ======================== Top Features Slider end ==========================


// ================================= Brand slider Start =========================
var brandSlider = new Swiper('.brand-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: true,
  speed: 1500,
  grabCursor: true,
  loop: true,
  slidesPerView: 7,
  breakpoints: {
      300: {
          slidesPerView: 2,
      },
      575: {
          slidesPerView: 3,
      },
      768: {
          slidesPerView: 4,
      },
      992: {
          slidesPerView: 5,
      },
      1200: {
          slidesPerView: 6,
      },
      1400: {
          slidesPerView: 7,
      },
  }
});
// ================================= Brand slider End =========================


// ========================= Counter Up Js Start ===================
const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains('is-visible')) {
        counterUp(el, {
          duration: 3500,
          delay: 16,
        });
        el.classList.add('is-visible');
      }
    });
  };
  const IO = new IntersectionObserver(callback, { threshold: 1 });

  // Banner statistics Counter
  const statisticsCounter = document.querySelectorAll('.counter');
  if (statisticsCounter.length > 0) {
    statisticsCounter.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // performance Count
  const performanceCount = document.querySelectorAll('.counter');
  if (performanceCount.length > 0) {
    performanceCount.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }
// ========================= Counter Up Js End ===================

// ========================= AOS Js Start ===================
AOS.init();
// ========================= AOS Js End ===================


// ========================= Animated Radial Progress Js Start ===================
  function animateProgress() {
      $('svg.radial-progress').each(function () {
          // Check if the element is within the viewport
          const elementTop = $(this).offset().top;
          const elementBottom = elementTop + $(this).outerHeight();
          const viewportTop = $(window).scrollTop();
          const viewportBottom = viewportTop + $(window).height();

          if (elementBottom > viewportTop && elementTop < viewportBottom) {
              const percent = $(this).data('percentage');
              const radius = $(this).find('circle.complete').attr('r');
              const circumference = 2 * Math.PI * radius;
              const strokeDashOffset = circumference - (percent / 100) * circumference;

              // Animate the circle
              $(this).find('circle.complete').css('stroke-dashoffset', strokeDashOffset);
          }
      });
  }

  // Trigger animation on scroll and page load
  $(window).on('scroll', animateProgress);
  animateProgress(); // Run on page load
// ========================= Animated Radial Progress Js End ===================


// ========================= throwable Js Start ===================
$(".throwable-element").throwable({
  drag: true, // Enable dragging
  gravity: {
      x: 0,
      y: 0 // No gravity effect
  },
  impulse: {
      f: 52, // Force of impulse
      p: {
          x: 0,
          y: 0 // Direction of impulse
      }
  },
  autostart: true, // Automatically start
  bounce: 0.8, // Reduced bounce effect
  damping: 100, // Damping to slow down motion
  containment: ".throwable-wrapper" // Restrict movement to the wrapper's boundaries
});
// ========================= throwable Js End ===================


// ========================= ShowCase Slider Js start ===================
var brandSlider = new Swiper('.show-case-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: true,
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 4,
  centeredSlides: true, 
  breakpoints: {
    300: {
        slidesPerView: 1,
    },
    576: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 2,
    },
    1200: {
        slidesPerView: 3,
    },
    1201: {
        slidesPerView: 4,
    },
  }
});
// ========================= ShowCase Slider Js End ===================


// ========================= Testimonials Slider Js start ===================
var testimonialsSlider = new Swiper('.testimonials-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,  
  slidesPerView: 3,
  autoplay: false,
  breakpoints: {
    200: {
        slidesPerView: 1,
    },
    576: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 2,
    },
    1200: {
        slidesPerView: 3,
    },
  }
});
// ========================= Testimonials Slider Js End ===================



  // ========================= Testimonial Four Slider Js Start ==============
  // $('.testimonial-four-slider').slick({
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   speed: 1500,
  //   dots: true,
  //   pauseOnHover: true,
  //   arrows: false,
  //   draggable: true,
  //   speed: 900,
  //   infinite: true,
  //   prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
  //   nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
  //   responsive: [
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 1,
  //         arrows: false,
  //       }
  //     }
  //   ]
  // });
  // ========================= Testimonial Four Slider Js End ===================
  
  
  // ========================== Add Attribute For Bg Image Js Start ====================
    // $(".background-img").css('background', function () {
    //   var bg = ('url(' + $(this).data("background-image") + ')');
    //   return bg;
    // });
  // ========================== Add Attribute For Bg Image Js End =====================

  // ================== Password Show Hide Js Start ==========
  // $(".toggle-password").on('click', function() {
  //   $(this).toggleClass("active");
  //   var input = $($(this).attr("id"));
  //   if (input.attr("type") == "password") {
  //     input.attr("type", "text");
  //     $(this).removeClass('ph-bold ph-eye-closed');
  //     $(this).addClass('ph-bold ph-eye');
  //   } else {
  //     input.attr("type", "password");
  //       $(this).addClass('ph-bold ph-eye-closed');
  //   }
  // });
  // ========================= Password Show Hide Js End ===========================

  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
    $(window).on("load", function(){
      $('.preloader').fadeOut(); 
    })
    // ========================= Preloader Js End=====================

    // ========================= Header Sticky Js Start ==============
    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= 260) {
        $('.header').addClass('fixed-header');
      }
      else {
          $('.header').removeClass('fixed-header');
      }
    }); 
    // ========================= Header Sticky Js End===================

})(jQuery);
