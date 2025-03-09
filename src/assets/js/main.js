(function ($) {
  'use strict';
  
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
  };
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
  });
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

  // ********************* Toast Notification Js start *********************
  function toastMessage(messageType, messageTitle, messageText, messageIcon) {
    let toastContainer = document.querySelector('#toast-container'); 

    let toast = document.createElement('div');
    toast.className = `toast-message ${messageType}`;

    toast.innerHTML = `
        <div class="toast-message__content">
            <span class="toast-message__icon">
                <i class="${messageIcon}"></i>
            </span>
            <div class="flex-grow-1">
                <div class="d-flex align-items-start justify-content-between mb-1">
                    <h6 class="toast-message__title">${messageTitle}</h6>
                    <button type="button" class="toast-message__close">
                        <i class="ph-bold ph-x"></i>
                    </button>
                </div>
                <span class="toast-message__text">${messageText}</span>
            </div>
        </div>
        <div class="progress__bar"></div>
    `;

    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('active');
    }, 50);

    let totalDuration = 3500;
    let startTime = Date.now();
    let remainingTime = totalDuration;
    let toastTimeout = setTimeout(hideToast, remainingTime);

    function hideToast() {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }

    // Remove Toast
    let closeToast = toast.querySelector('.toast-message__close');
    closeToast.addEventListener('click', function () {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 500);
    });
    // Remove Toast


    // Pause Timeout on Hover
    toast.addEventListener('mouseenter', function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
    });

    // Resume Timeout on Mouse Leave
    toast.addEventListener('mouseleave', function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
    });
}
// ********************* Toast Notification Js End *********************


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
// AOS.init();
  AOS.init({ 
    once: true 
  })
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

// ========================= ShowCase Slider Js start ===================
var showCaseSlider = new Swiper('.show-case-slider', {
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


// ========================= Accordion Tabs Image Change Js Start ===================
  const accordionButtons = document.querySelectorAll(".accordion-button");
  const faqImage = document.getElementById("faqImage");
  
  if(accordionButtons && faqImage) {
    accordionButtons.forEach(button => {
        button.addEventListener("click", function () {
            const newImageSrc = this.getAttribute("data-img");
            console.log(newImageSrc);
            
  
            if (newImageSrc && faqImage.src !== newImageSrc) {
              faqImage.style.opacity = ".3";
              setTimeout(() => {
                  faqImage.src = newImageSrc;
                  faqImage.style.opacity = "1";
              }, 300); 
            }
        });
    });
  }
// ========================= Accordion Tabs Image Change Js End ===================

// ========================= Testimonials Tab Js start ===================
let testimonialsItems = document.querySelectorAll('.testimonials-item');

if (testimonialsItems.length) {
  testimonialsItems.forEach(testimonialsItem => {
    testimonialsItem.addEventListener('click', function () {
      testimonialsItems.forEach(item => item.classList.remove('active'));

      this.classList.add('active');
    });
  });
}
// ========================= Testimonials Tab Js End ===================

// ========================== Set Text In Custom dropdown Js Start =================================
$('.selectable-text-list li').each(function () {
  var thisItem = $(this); 

  thisItem.on('click', function () {
    const listText = thisItem.text(); 
    var item = thisItem.parent().parent().find('.selected-text').text(listText); 
  }); 
}); 
// ========================== Set Text In Custom dropdown Js End =================================


// ========================== Domain Select Js Start =================================
let selectDomainWrappers = document.querySelectorAll('.select-domain-wrapper'); 

selectDomainWrappers.forEach(selectDomainWrapper => {
  let selectDomain = selectDomainWrapper.querySelector('.select-domain');
  let domainItemButtons = selectDomainWrapper.querySelectorAll('.domain-item-button'); 
  
  domainItemButtons.forEach(domainItemButton => {
    domainItemButton.addEventListener('click', function () {
      let selectedDomain = this.getAttribute("data-domain");
      console.log(selectedDomain);
      
      selectDomain.value = selectedDomain;
  
      domainItemButtons.forEach(button => {
        button.classList.remove('active-domain');
      });
      this.classList.add('active-domain');
      // domainItemButtons.forEach(button => {
      //   button.style.boxShadow = 'none';
      // });
      // this.style.boxShadow = '0px 4px 15px 0px #00000029';
    });
  });
});
// ========================== Domain Select Js End =================================
  
// ========================== About Two Js Start =====================
var aboutTwoThumbsSliderOne = new Swiper(".about-two-thumbs-slider-one", {
	slidesPerView: 2,
  grabCursor: true,
	loop: true,
	centeredSlides: true,
	direction: "vertical",
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	speed: 6000,
  autoplay: {
		delay: 0,
		enabled: true,
	}
});

var aboutTwoThumbsSliderTwo = new Swiper(".about-two-thumbs-slider-two", {
	slidesPerView: 2,
  grabCursor: true,
	loop: true,
	centeredSlides: true,
	direction: "vertical",
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	speed: 6000,
  autoplay: {
		delay: 0,
		enabled: true,
    reverseDirection: true,
    disableOnInteraction: false,
	}
});
// ========================== About Two Js End =====================

// ========================== hosting plan slider Js start =====================
var hostingPlanSlider = new Swiper('.hosting-plan-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: true,
  speed: 1500,
  grabCursor: true,
  loop: true,
  slidesPerView: 4,
  navigation: {
    nextEl: ".swiper-hosting-button-next",
    prevEl: ".swiper-hosting-button-prev",
  },
  pagination: {
    el: ".swiper-hosting-pagination",
    clickable: true
  },
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
    992: {
        slidesPerView: 3,
    },
    1199: {
        slidesPerView: 4,
    },
  }
});
// ========================== hosting plan slider Js End =====================


// ========================== Add Attribute For Bg Image Js Start ====================
$(".background-img").css('background', function () {
  var bg = ('url(' + $(this).data("background-image") + ')');
  return bg;
});
// ========================== Add Attribute For Bg Image Js End =====================

// ========================= ShowCase Slider Js start ===================
var serviceSlider = new Swiper('.service-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 4,
  pagination: {
    el: ".service-slider-pagination",
    clickable: true,
  },
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
    992: {
        slidesPerView: 3,
    },
    1300: {
        slidesPerView: 4,
    },
  }
});
// ========================= ShowCase Slider Js End ===================

// ================================= Brand slider Start =========================
var brandThreeSlider = new Swiper('.brand-three-slider', {
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

// ========================= Plan Execute slider Js start ===================
var planExecuteSlider = new Swiper('.plan-execute-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 4,
  pagination: {
    el: ".plan-execute-pagination",
    clickable: true,
  },
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
    992: {
        slidesPerView: 3,
    },
    1300: {
        slidesPerView: 4,
    },
  }
});
// ========================= Plan Execute slider Js End ===================

// ========================= Testimonials Three slider Js start ===================
var planExecuteSlider = new Swiper('.testimonials-three-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: false,
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 1,
  pagination: {
    el: ".plan-execute-pagination",
    clickable: true,
  },
});
// ========================= Testimonials Three slider Js End ===================

  // ========================= magnific Popup Js Start =====================
  $('.play-button').magnificPopup({
    type:'iframe',
    removalDelay: 300,
    mainClass: 'mfp-fade',
  });
  // ========================= magnific Popup Js End =====================

  // ========================= List gird View Js Start =====================
  let listViewBtn = document.querySelector('.list-view-btn');
  let gridViewBtn = document.querySelector('.grid-view-btn');

  if(listViewBtn && gridViewBtn) {
    listViewBtn.addEventListener('click', function () {
      body.classList.remove('grid-view');
      this.classList.remove('text-heading');
      gridViewBtn.classList.remove('text-main-600');
      this.classList.add('text-main-600');
    });
  
    gridViewBtn.addEventListener('click', function () {
      body.classList.add('grid-view');
      this.classList.remove('text-heading');
      listViewBtn.classList.remove('text-main-600');
      this.classList.add('text-main-600');
    });
  }
  // ========================= List gird View Js End =====================

  // ========================= Range Slider Js Start =====================
  const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
  let priceGap = 1000;

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });
  // ========================= Range Slider Js End =====================

  
  // ========================= Shop Details Slider Js Start =====================
  var shopSmallThumbs = new Swiper(".shop-small-thumbs", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var shopThumbs = new Swiper(".shop-thumbs", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: shopSmallThumbs,
    },
  });
  // ========================= Shop Details Slider Js End =====================

  
  // ========================= Color Picker Js Start =====================
  let colorPickers = document.querySelectorAll('.color-picker');

  colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('click', function () {
      document.querySelectorAll('.color-picker__color').forEach(color => {
        color.style.transform = 'scale(1)';
      });
  
      this.querySelector('.color-picker__color').style.transform = 'scale(2)';
    });
  });
  // ========================= Color Picker Js End =====================

  // ========================= Size Picker Js Start =====================
  let sizeBtns = document.querySelectorAll('.size-btn');

  sizeBtns.forEach(sizeBtn => {
    sizeBtn.addEventListener('click', function () {
      sizeBtns.forEach(btn => btn.classList.remove('bg-main-600', 'text-white', 'border-main-600'));
      this.classList.add('bg-main-600', 'text-white', 'border-main-600');
    });
  });
  
  // ========================= Size Picker Js End =====================

  
  // ========================= Increment & Decrement Js Start =====================
  let decrementBtns = document.querySelectorAll('.decrement-btn');
  let incrementBtns = document.querySelectorAll('.increment-btn');
  
  incrementBtns.forEach(incrementBtn => {
    incrementBtn.addEventListener('click', function () {
      let input = this.parentElement.querySelector('.input-value');
      let count = parseInt(input.value);
      input.value = count + 1;
    });
  });
  
  decrementBtns.forEach(decrementBtn => {
    decrementBtn.addEventListener('click', function () {
      let input = this.parentElement.querySelector('.input-value');
      let count = parseInt(input.value);
      if (count > 0) {
        input.value = count - 1;
      }
    });
  });
  // ========================= Increment & Decrement Js End =====================


  // ========================= Delete Item Js start ===================
  let deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', function () {
      this.closest('.delete-item').classList.add('d-none');
      toastMessage("danger", "Deleted", "You deleted successfully!", 'ph-bold ph-trash');
    });
  });
  // ========================= Delete Item Js End ===================

  // ========================= Form Submit Js Start ===================
  let formSubmit = document.querySelector('.form-submit');
  let fields = document.querySelectorAll('input');
  let textarea = document.querySelector('textarea');

  if(formSubmit && fields) {
    formSubmit.addEventListener('submit', function (e) {
      e.preventDefault();
      fields.forEach(field => {
        field.value = "";
      });
      if(textarea) {
        textarea.value = "";
      }
      toastMessage("success", "Success", "Form submitted successfully!", 'ph-fill ph-check-circle');
    });
  }
  // ========================= Form Submit Js End ===================
  
  // ================== Password Show Hide Js Start ==========
  $(".toggle-password").on('click', function() {
    $(this).toggleClass("active");
    var input = $($(this).attr("id"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
      $(this).removeClass('ph-bold ph-eye-slash');
      $(this).addClass('ph-bold ph-eye');
    } else {
      input.attr("type", "password");
        $(this).addClass('ph-bold ph-eye-slash');
    }
  });
  // ========================= Password Show Hide Js End ===========================

  // ========================= Throwable Js Start ===================
    // if($('.drag-rotate-element').length) {
    //   $(".drag-rotate-element").throwable({
    //     containment: "parent", // Restrict movement inside .myContainer
    //     bounce: true, // Enables bouncing effect
    //     damping: 0.1, // Controls how much the element slows down
    //     collisionDetection: false, // Detects collision with other elements
    //     areaDetection: 3000, // Expands detection area for better interaction

    //       drag: true,
    //       gravity: {
    //         x: 0,
    //         y: 0
    //       },
    //       impulse: {
    //         f: 52,
    //         p: {
    //           x: 0,
    //           y: 0
    //         }
    //       },
    //       autostart: false,
    //       bounce: 0.5,
    //       damping: 100
    //   });
    // }
  // ========================= Throwable Js End ===================


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
