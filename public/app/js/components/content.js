!function() {
    /* global angular */
  'use strict'; // jshint ignore:line

  function ContentController($scope, SubmitFormService, AnimationService, $translate) {
    var vm = this;

    // Register services
    vm.submitter = SubmitFormService;
    vm.animate = AnimationService;

     // GUI components
    vm.gui = {
      elements : {
        joWrapIntro: $('h4#jo-intro-title'),
        joCards: $('.jo-content__presentation--card'),
        response: $('#jo-content-response')
      },
      sections: {
        main: $('.jo-content__main'),
      }
    };

    vm.isScrolled = false;

    // Subscribe form options
    vm.form = {
      subscribed: false,
      response: undefined,
      // Form data
      options: {
        url: '/app/subscribe',
        payload: {
          email: undefined
        }
      }
    }

    // Submit subscribe form
    vm.submit = function() {
      // Init form options
      vm.form.response = null;
      vm.submitter.init(vm.form.options);

      if(vm.form.options.payload.email !== undefined) {
        var promise = vm.submitter.submit();

        promise.then(function(data) {
          // Get translation
          $translate('app.subscribe_success').then(function(expression) {

            vm.form.response = expression;
          });

        })
        .catch(function(data) {
          // Get translation
          vm.gui.elements.response.show().removeAttr('style'); // If got hidden

          $translate('server_error.' + data.message).then(function(expression) {

            vm.form.response = expression;
          });
        });
      }
    }

    // Animations
    vm.goTo = function(to) {
      vm.animate.scrollTo(vm.gui.sections[to], 1500, null);
    }

    vm.close = function(index) {
      vm.gui.elements[index].hide();
    }
  }

  function Content() {
    return {
      restrict: 'AE',
      templateUrl: '/app/partials/content.html',
      controller: 'ContentController',
      link: function(scope, element, attrs, ctrl, compile) {
        var vm = ctrl;

        // Scroll event fired
        // $(window).on('scroll', function(e) {
        //
        //   e.preventDefault();
        //
        //   if(!vm.isScrolled) {
        //
        //     if($(this).scrollTop() >= vm.gui.sections.main.offset().top) {
        //       vm.animate.fadeIn(vm.gui.elements.joCards, 2000, undefined);
        //       vm.animate.slide(vm.gui.elements.joCards, '-20', 1000, undefined); // Parallel
        //
        //       vm.isScrolled = true;
        //     }
        //   }
        // })
      },
      controllerAs: 'vm'
    };
  }

  ContentController.$inject = ['$scope', 'SubmitFormService', 'AnimationService', '$translate'];

  angular.module('jo.content', ['jo.animate', 'jo.form', 'jo.i18n'])
  .controller('ContentController', ContentController)
  .directive('joContent', Content)
}();
