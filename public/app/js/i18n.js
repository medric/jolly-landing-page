/**
	Translation module
*/

!function() {
  /* global angular */
  'use strict'; // jshint ignore:line

  /**
  * @class i18nConfig
  * @classdesc Translation config
  * @ngInject
  */
  function i18nConfig($translateProvider) {
  	// Load from JSON files
    $translateProvider.useStaticFilesLoader({
      prefix: '/dist/locales/locale-',
      suffix: '.json'
    });
    
    $translateProvider.preferredLanguage('fr_FR');
  }
    
  /**
  * @class i18nService
  * @classdesc Translation service
  * @ngInject
  */
  /*function i18ni18nService($scope, $translate) {
    
  }*/

  i18nConfig.$inject = ['$translateProvider'];

  var i18n = angular.module('jo.i18n', ['pascalprecht.translate'])
    .config(i18nConfig);
}();
