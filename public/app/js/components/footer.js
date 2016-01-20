!function() {
    /* global angular */
  'use strict'; // jshint ignore:line

  function Footer() {
    return {
      restrict: 'EA',
      templateUrl: '/app/partials/footer.html',
      link: function(scope, element, attrs, ctrl, compile) {

      }
    };
  }

  angular.module('jo.footer', [])
  .directive('joFooter', Footer)
}();
