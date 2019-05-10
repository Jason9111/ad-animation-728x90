      "use strict"

      /* [ONLY IF] platform == DoubleClick Studio (DCRM) */
      var Banner = Banner || {}, addListeners, exitHandler, mainClick = document.getElementById('main-click');       

    Banner.init = function() {
         addListeners();
         Banner.animate();
      }

      addListeners = function() {
         mainClick.addEventListener('click', exitHandler, false);
      };

      exitHandler = function(e) {
      Enabler.exit('DEFAULT_EXIT');
    }

    if (Enabler.isInitialized()) {
      Banner.init();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, Banner.init)
    } 

    /* [END] DoubleClick Studio (DCRM) */


    /*******************
      BANNER ANIMATION
    ********************/

      var tl;
      var curLoop = 0;
      var maxLoop = 10;

      Banner.animate = function(){

       // Initiating Animation Timeline
       tl = new TimelineMax({repeat:maxLoop, onRepeat:resetAnimation});     

       setupAnimation();
      };
      
      var setupAnimation = function() {
       // Timeline Animation Here
       tl

       .to(stage_bg_001, 1, {autoAlpha:1, ease:Power1.easeOut})
       .to(stage_bg_002, 1, {autoAlpha:1}, '+=1')
       .fromTo(stage_txt_002, 2, {autoAlpha:0, left: 0}, {autoAlpha:1, left: 50})
        .to([stage_bg_003], 2.6, {autoAlpha:1})
       .to([stage_disclaimer_btn, stage_cta_btn], 0.4, {autoAlpha:1}, '2')
       .addLabel('jumperHook')

      console.log('Animation duration: ' + tl.duration());

       // Events
       document.getElementById('stage_disclaimer_btn').addEventListener('click', disclaimerShow);
       document.getElementById('stage_disclaimer_close_btn').addEventListener('click', disclaimerHide);
      }

      var resetAnimation = function() {
        curLoop++;
        if(curLoop >= maxLoop) {
         tl.addPause('jumperHook');
        }
      }

      // Disclaimer
      var disclaimerShow = function(){ //Show
       tl.pause();
       TweenLite.set(stage_disclaimer, {display: "block"});
       TweenLite.fromTo(stage_disclaimer, 0.5, {opacity: 0}, {opacity: 1});
      }

      var disclaimerHide = function() { // Hide
       TweenLite.fromTo(stage_disclaimer, 0.5, {opacity: 1}, {opacity: 0});
       TweenLite.set(stage_disclaimer, {display: "none"});
       if(curLoop < maxLoop) {
         tl.play();
       }
      }