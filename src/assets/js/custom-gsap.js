/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline(); 
gsap.registerPlugin(ScrollTrigger, SplitText);

// =================================== Custom Cursor Js Start =====================================
var body = document.body;
var cursor = document.querySelector('.cursor');
var dot = document.querySelector('.dot');
var cursorSmalls = document.querySelectorAll('.cursor-small');
var cursorBigs = document.querySelectorAll('.cursor-big');

body.addEventListener('mousemove', function (event) {
    gsap.to(cursor, {
        x: event.x,
        y: event.y,
        duration: 2, 
        delay: 0.1,
        visibility: 'visible',
        ease: "expo.out",
    });
});

body.addEventListener('mousemove', function (event) {
    gsap.to(dot, {
        x: event.x,
        y: event.y,
        duration: 1.5,
        visibility: 'visible',
        ease: "expo.out",
    });
});

// Small Cursor
cursorSmalls.forEach(cursorSmall => {
  cursorSmall.addEventListener('mouseenter', function () {
      gsap.to(dot, {
          scale: 8,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
          visibility: 'hidden',
          opacity: 0
      });
  });
  
  cursorSmall.addEventListener('mouseleave', function () {
      gsap.to(dot, {
          scale: 1,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
        visibility: 'visible',
        opacity: 1
      });
  });
});

// Big Cursor
cursorBigs.forEach(cursorBig => {
  cursorBig.addEventListener('mouseenter', function () {
      gsap.to(dot, {
          scale: 16,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
          visibility: 'hidden',
          opacity: 0
      });
  });
  
  cursorBig.addEventListener('mouseleave', function () {
      gsap.to(dot, {
          scale: 1,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
        visibility: 'visible',
        opacity: 1
      });
  });
});
// =================================== Custom Cursor Js End =====================================


// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia(); 
var mtl = gsap.timeline({paused: true}); 

const toggleMobileMenu = document.querySelector('.toggle-mobileMenu');
const closeButton = document.querySelector('.close-button');
const mobileSideOverlay = document.querySelector('.side-overlay');

mmm.add("(max-width: 991px)", () => {
  
  mtl.to('.side-overlay', {
    opacity: 1,
    visibility: 'visible',
    duration: .25, 
  });
  
  mtl.to('.mobile-menu', {
    x: 0,
    duration: .25,
  });
  
  mtl.from('.nav-menu__item', {
    opacity: 0,
    duration: .25,
    y: -60,
    stagger: .12,
  });

  mtl.from('.close-button', {
    opacity: 0,
    scale: 0,
    duration: .1,
  });

  toggleMobileMenu.addEventListener('click', function () {
    mtl.play();
    document.body.style.overflow = 'hidden'
  });

  closeButton.addEventListener('click', function () {
    mtl.reverse();
    document.body.style.overflow = ''
  });

  mobileSideOverlay.addEventListener('click', function () {
    mtl.reverse();
    document.body.style.overflow = ''
  });

});
// **************************** Mobile Menu js End ****************************


// =================================== Custom Split text Js Start =====================================
if ($('.splitTextStyleOne').length > 0) {
  let splitTextLines = gsap.utils.toArray(".splitTextStyleOne");

  splitTextLines.forEach(splitTextLine => { 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: 'top 99%',
        duration: .6,
        end: 'bottom 90%',
        scrub: false,
        markers: false,
        toggleActions: 'restart none none none'
      }
    });

    const itemSplitted = new SplitText(splitTextLine, { type: "lines" });

    gsap.set(splitTextLine, { perspective: 500 });
    itemSplitted.split({ type: "lines" })

    tl.from(itemSplitted.lines, { 
      duration: .6, 
      delay: 0.3, 
      opacity: 0, 
      rotationX: -80, 
      force3D: true, 
      transformOrigin: "top center -50",
      stagger: 0.1 
    });
  });
}
// =================================== Custom Split text Js End =====================================


// **************************** Position Aware button hover js start ****************************
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair")
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const {
      left,
      top,
      width,
      height
    } = this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top)
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out"
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.9,
        ease: "power2.out"
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.9,
        ease: "power2"
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});
// **************************** Position Aware button hover js End ****************************

// **************************** Banner js start ****************************
if($('.flower').length) {
  gsap.from(".flower", {
    scale: 0,
    x: 50,
    y: 50,
    ease: "circ.inOut",
    ease: "elastic.inOut(1,0.3)",
    duration: 3,
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".banner",
      start: "top 90%",
      toggleActions: "restart none restart none",
    }
  });
}
// **************************** Banner js End ****************************

// **************************** Ball Bounce js start ****************************
if($('.flower').length) { 
  gsap.from(".ball", {
      y: -140,
      ease: "bounce.out", 
      duration: 1.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#roadmap-section",
        start: "top 90%",
        toggleActions: "restart none restart none",
      }
  });
}
// **************************** Ball Bounce js End ****************************

// **************************** Choose Us js start ****************************
if($('.flower').length) {  
  gsap.from(".box", {
      scale: .4,
      rotate: '90deg',
      ease: "bounce.out", 
      duration: 2,
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#box-wrapper",
        start: "top 90%",
        toggleActions: "restart none restart none",
      }
  });
}
// **************************** Choose Us js End ****************************

// **************************** Blog js start ****************************
if($('.flower').length) {   
  gsap.to(".line", {
      ease: "bounce.out",
      width: '100%',
      duration: 2,
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".blog",
        start: "top 90%",
        toggleActions: "restart none restart none",
      }
  });
}
// **************************** Blog js End ****************************



/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */