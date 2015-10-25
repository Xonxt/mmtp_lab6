'use strict';

var mainModule = angular.module('app.main', []);

mainModule.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
 
    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }
 
            socket.on(eventName, wrapper);
 
            return function () {
              socket.removeListener(eventName, wrapper);
            };
        },
 
        emit: function (eventName, data, callback) {             
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {                       
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);

mainModule.controller('MainController', ['socket', MainController]);

function MainController(socket) {   
	
	var main = this;
  
	main.sendWithSocket = function(msg){
		socket.emit("send", msg);       
	}
  
  socket.on("message", function(data) {
    if (!main.textField)
      main.textField = "";
    main.textField += "user[" + data.userID + "]" + data.msg + "\n";
  });
  
  socket.on("init", function(data) {
    if (!main.textField)
      main.textField = "";
    main.textField += "User connected\n";
  });
			
}