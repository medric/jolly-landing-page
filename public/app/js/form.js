!function() {   
    /* global angular */
    'use strict'; // jshint ignore:line

    /**
    * @class SubmitFormService
    * @classdesc
    * @ngInject
    */
    function SubmitFormService($http, $q) {
        var self = this;
        
        var options = {
            url: undefined,
            payload: {
            }
        }

        self.init = function(_options) {
            if(_options !== undefined) {
                angular.extend(options, _options);
            }
        }

        self.submit = function() {
           
            var deferred = $q.defer();

            if(options !== undefined) {
                $http.post(options.url, JSON.stringify(options.payload))
                    .success(function(data, status, headers, config) {

                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        
                        deferred.reject(data);
                    });
            } else {
               // Do something
            }

            return deferred.promise;
        }
    }

    SubmitFormService.$inject = ['$http', '$q'];

    angular.module('jo.form', [])
        .service('SubmitFormService', SubmitFormService);
}();