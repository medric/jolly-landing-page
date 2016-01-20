!function() {   
  /* global angular */
  'use strict'; // jshint ignore:line

  /**
  * @class AnimationService
  * @classdesc Scroll service
  * @ngInject
  */
  function AnimationService($window) {
    var self = this;

    var options = {};

    //http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
    
    self.scrollTo = function(location, duration, cb) {
      var container = isChrome ? 'body' : 'html';

      $(location).velocity('scroll', { 
          container: $(container),
          duration: duration,
          delay: 400,
          mobileHA: false,
          complete: cb
      });
    }

    self.slide = function($element, top, duration, cb) {
      $element.velocity({ 
        top: top + 'px'
      }, {
        queue: false,
        duration: 1500
      }, 'easeInSine');
    }

    self.fadeIn = function($element, duration, cb) {
      $element
        .velocity('fadeIn', { 
          duration: duration,
          easing: 'easeInSine', 
          complete: cb
        });
    }

    self.fadeOut = function($element, duration, cb) {
      $element
        .velocity('fadeOut', { duration: duration });
    }
  }

  AnimationService.$inject = ['$window'];
 
  angular.module('jo.animate', [])
    .service('AnimationService', AnimationService);
}();