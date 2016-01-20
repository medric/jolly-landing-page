!function() {
    /* global angular */
  'use strict'; // jshint ignore:line

  function Header() {
    return {
      restrict: 'EA',
      templateUrl: '/app/partials/header.html',
      link: function(scope, element, attrs, ctrl, compile) {
      }
    };
  }

  angular.module('jo.header', [])
  .directive('joHeader', Header)
}();
