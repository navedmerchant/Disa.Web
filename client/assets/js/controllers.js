/**
 * Created by naved on 20/11/15.
 */
var main = angular.module('application');

main.controller('LoginController',
  ['$rootScope',
    '$scope',
    'localStorageService',
    'communications',
    '$state',
    function ($rootScope,
              $scope,
              localStorageService,
              communications,
              $state) {

      $rootScope.connectionOpened = false;


      var id = communications.getId($scope,function(id){
        //in cases where the digest cycle is done, we call evalasync so that the scope is updated properly
        $scope.$evalAsync(function(){
          $scope.thisId = id;
        });
      });

      var otherPeerId = communications.getOtherId();
      if(otherPeerId){
        $state.go('chat');
      }


      communications.subscribeConnectionOpen($scope, function () {
        $rootScope.connectionOpened = true;
        $state.go('chat');
      });


      $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          console.log('state change sucess');
        });

      $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
          console.log('state change error');
        });

    }]);


main.controller('ChatController',
  ['$rootScope',
    '$scope',
    'localStorageService',
    'communications',
    '$state',
    function ($rootScope,
              $scope,
              localStorageService,
              communications,
              $state) {


    }]);
