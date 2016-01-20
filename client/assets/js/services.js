/**
 * Created by naved on 20/11/15.
 */
var main = angular.module('application');


main.factory('communications', function (localStorageService, $rootScope) {

  var Communications = function () {
    //try to get the peer id from local storage(if weve already had one before)
    var id = localStorageService.get('peerId');
    //try to get the remote peer id;
    var otherPeerId = localStorageService.get('otherPeerId');
    // by convention
    var that = this;
    //local object for holding the peer instance. Should not be accessed directly from the methods.
    // use the getObject method to get the instance of the peer.
    var peer;
    //Empty connection object which will be filled later when the connection is established
    this.connection = {};

    /**
     * This function is called when constructing the object, so that if the peer is not registered, it is registered
     * with the server. It is only called once, after that the peer Id is saved.
     */
    var intialize = function () {
      if (!id) {
        peer = new Peer({key: 'ytgklpf684u0udi'});
        peer.on('open', function (peerId) {
          localStorageService.set('peerId', peerId);
          $rootScope.$emit('peer-opened', peerId);
          id = peerId;
        });
      }
    };
    /**
     * This is a n async function that gives the  back the current id of the peer. It has to be async since
     * the id could not be retrieved even once and in that case the callback is called after the id has been recieved.
     * @param scope the current angular scope
     * @param callback the callback function
     */
    this.getId = function (scope, callback) {
      if (id!=null) {
        callback(id);
      } else {
        var handler = $rootScope.$on('peer-opened', function(sender,id){
          callback(id);
        });
        scope.$on('$destroy', handler);
      }
    };


    /**
     * Method to return the id of the other peer.
     * @returns {string} the id of the other peer, if the connection has atleast been established once
     */

    this.getOtherId = function () {
      return otherPeerId;
    }

    /**
     * Internal method to get the object of the communicating service.
     * @returns {object} peer object, so that the methods can be called.
     */
    var getObject = function () {
      if (peer) {
        return peer;
      }
      else {
        return new Peer(id, {key: 'ytgklpf684u0udi'});
      }
    };

    /**
     * Internal function to start listening for connections. Emits an event to notify that the connection
     * has been opened. The connection can then be accessed through the connection object of this class.
     */
    function openConnection() {
      var peer = getObject();
      peer.on('connection', function (connection) {
        otherPeerId = connection.peer;
        localStorageService.set('otherPeerId', otherPeerId);
        connection.on('open', function () {
          $rootScope.$emit('connection-open');
          that.connection = connection;
        });
      });
    }

    /**
     *
     * @param scope {object} the current scope of the
     * @param callback
     */
    this.subscribeConnectionOpen = function (scope, callback) {
      var handler = $rootScope.$on('connection-open', callback);
      scope.$on('$destroy', handler);
      openConnection();
    };

    intialize();
  };
  return new Communications();
});
