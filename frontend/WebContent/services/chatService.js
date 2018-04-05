/**
 * 
 */
app.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});

	app.directive('ngFocus', function() {
	  return function(scope, element, attrs) {
	    element.bind('click', function() {
	      $('.' + attrs.ngFocus)[0].focus();
	    });
	  };
	});
	
app.factory('chatService',function($rootScope){
	alert('chatService app factory')
	var socket= new SockJS("/middleware/chatmodule")
	var stompClient=Stomp.over(socket);
	console.log(stompClient)
	stompClient.connect('', '', function(frame){
		alert('Connected to ChatService')
		$rootScope.$broadcast('sockConnected',frame)
		
	})
	return{
		stompClient:stompClient
	}
})