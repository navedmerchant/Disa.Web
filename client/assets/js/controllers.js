/**
 * Created by naved on 20/11/15.
 */
var main = angular.module('application');


/**
 * Controller fot the login page.
 */

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

      //denotes the connection has been opened. If not, it has to be opened by the chat
      //controller
      $rootScope.connectionOpened = false;

      /**
       * get id for the client and show it on screen
       */
      var id = communications.getId($scope,function(id){
        //in cases where the digest cycle is done, we call evalasync so that the scope is updated properly
        $scope.$evalAsync(function(){
          $scope.thisId = id;
        });
      });

      //if the other peers id has been saved, it means that the connection has been established before.
      //go to the chat state directly. it will handle making the connection to the client
      var otherPeerId = communications.getOtherId();
      if(otherPeerId){
        $state.go('chat');
      }

      //subscribe to the connection open event. When it happens, go to the next state
      communications.subscribeConnectionOpen($scope, function () {
        $rootScope.connectionOpened = true;
        $state.go('chat');
      });


      // state change events for logging.
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

      /**
       * The following code is just sample data for the data to be shown on the screen.
       * this will actually be filled by a web worker, by the data sent by disa.
       */
      $scope.chats = [];

      var chat =  new Disa.Chat("solo");
      chat.contact = "Jake";
      chat.primaryService = Disa.ServiceType.Text;
      chat.services = [Disa.ServiceType.Facebook, Disa.ServiceType.Text];

      var bubble = new Disa.Bubble();
      bubble.service = Disa.ServiceType.Text;
      bubble.content = "Whats up bro?";
      bubble.messageType = Disa.Bubble.MessageType.sent;
      bubble.type = Disa.Bubble.BubbleType.Text;
      bubble.timeStamp = new Date();

      chat.bubbles.push(bubble);

      bubble = new Disa.Bubble();
      bubble.service = Disa.ServiceType.Text;
      bubble.content = "Nothing much working on the new emoji keyboard XD";
      bubble.messageType = Disa.Bubble.MessageType.received;
      bubble.type = Disa.Bubble.BubbleType.Text;
      bubble.timeStamp = new Date();

      chat.bubbles.push(bubble);

      bubble = new Disa.Bubble();
      bubble.service = Disa.ServiceType.Text;
      bubble.content = "Awesome";
      bubble.messageType = Disa.Bubble.MessageType.sent;
      bubble.type = Disa.Bubble.BubbleType.Text;
      bubble.timeStamp = new Date();

      chat.bubbles.push(bubble);


      $scope.chats.push(chat);

      chat =  new Disa.Chat("solo");
      chat.contact = "pro-bro";
      chat.primaryService = Disa.ServiceType.Facebook;
      chat.services = [Disa.ServiceType.Facebook, Disa.ServiceType.Text];


      bubble = new Disa.Bubble();
      bubble.service = Disa.ServiceType.Facebook;
      bubble.content = "man that goal was awesome";
      bubble.type = Disa.Bubble.BubbleType.Text;
      bubble.messageType = Disa.Bubble.MessageType.sent;
      bubble.timeStamp = new Date();

      chat.bubbles.push(bubble);

      bubble = new Disa.Bubble();
      bubble.service = Disa.ServiceType.Facebook;
      bubble.content = "true dat bro!";
      bubble.type = Disa.Bubble.BubbleType.Text;
      bubble.messageType = Disa.Bubble.MessageType.received;
      bubble.timeStamp = new Date();

      chat.bubbles.push(bubble);


      $scope.chats.push(chat);

      $scope.showChat = function(index){
          $scope.bubbles = $scope.chats[index].bubbles;
          $scope.chatHeader = $scope.chats[index].contact;
      };

    }]);
