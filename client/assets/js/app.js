(function () {
  'use strict';

  angular.module('application', [
      'ui.router',
      'ngAnimate',

      //foundation
      'foundation',
      'foundation.dynamicRouting',
      'foundation.dynamicRouting.animations',
      'LocalStorageModule', //for caching of local data
      'monospaced.qrcode', //QR code generation
      'sun.scrollable' //nanoscroller
    ])
      .config(config)
      .run(run)
    ;


  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/home');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
