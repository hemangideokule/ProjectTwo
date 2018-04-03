/**
 * 
 */
app.factory('chatService',function($rootScope){
	var socket= new SockJS("/middleware/chatmodule")
	var stompCLient=Stomp.over(socket);
	stompCLient.connect('','',function(frame){
		alert('connected')
		$rootScope.$broadcast('sockConnected',frame)
		
	})
	return{
		stompClient:stompClient
	}
})