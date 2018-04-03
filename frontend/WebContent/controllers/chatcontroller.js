/**
 * 
 */
app.controller('CHatCtrl',function($rootScope,$scope,chatService){
	$scope.stompClient=chatService.stompClient
	$scope.users=[];
	$scope.chats=[];
	$scope.$on('SockConnected',function(event,frame){
		alert('Successfully connected with WebSocket')
		alert('joined the chat room..!!')
	})
})