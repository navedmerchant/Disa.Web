/**
 * Created by naved on 20/11/15.
 */
var main =  angular.module('application');

main.factory('peer',function(localStorageService,$rootScope){
  var peerId = localStorageService.get('peerId');
  if(!peerId){
    var peer = new Peer({key:'ytgklpf684u0udi'});
    peer.on('open',function(id){
      peerId = id;
      localStorageService.set('peerId',peerId);
      $rootScope.$emit('open',peer);
    });
    return peerId;
  }
  else{
    return peerId;
  }
});
