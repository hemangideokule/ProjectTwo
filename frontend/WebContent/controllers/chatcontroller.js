/**
 * 
 */
app.controller('ChatCtrl',function($rootScope,$scope,chatService){
	 alert('entering chat controller')
	$scope.stompClient=chatService.stompClient
	$scope.users=[];
	$scope.chats=[];
	$scope.$on('sockConnected',function(event,frame){
		alert('Successfully connected with WebSocket')
		$scope.userName=$rootScope.loggedInUser.firstname
		alert($scope.userName+' '+'joined the chat room..!!')
		
		$scope.stompClient.subscribe("/app/join/"+$scope.userName,function(message){
			console.log(message.body)
	        alert(message.body)
	        $scope.users=JSON.parse(message.body)
	        $scope.$apply();
		})	
			$scope.stompClient.subscribe("/topic/join" , function(message){
				user= JSON.parse(message.body);
				if(user != $scope.userName && $.inArray(user, $scope.users) == -1) {
	                $scope.addUser(user);
	                $scope.latestUser = user;
	                $scope.$apply();
	                alert($scope.latestUser+' '+'has join the chat')
	                $('#joinedChat').fadeIn(500).delay(2000).fadeOut(500);
				}
	            
			})
		})
		
		$scope.addUser = function(user) {
        $scope.users.push(user);
        $scope.$apply();
		}
	
	$scope.sendMessage=function(chat){
		chat.from=$scope.userName
		$scope.stompClient.send("/app/chat",{},JSON.stringify(chat))//converts JSON format to string
		$rootScope.$broadcast('sendingChat',chat)
		$scope.chat.message=''
	}
	
	$scope.$on('sockConnected',function(event,frame){
	   $scope.userName=$rootScope.loggedInUser.firstname;
		
	   $scope.stompClient.subscribe("/queue/chats",function(message){
		   alert("Message is:"+message.body)
			$scope.processIncomingMessage(message,true)
		});
	   
	  $scope.stompClient.subscribe("/queue/chats"+$scope.userName,function(message){
		  alert("Message is:"+message.body)
		  $scope.processIncomingMessage(message,false)
		})
		
	})
	  $scope.processIncomingMessage=function(message,broadcast){
		message=JSON.parse(message.body)//message.body is chat object
		message.direction='incoming'
			if(message.from!=$scope.userName){
				$scope.addChat(message);
				$scope.$apply();
			}
	}
	
	$scope.addChat=function(chat){
		$scope.chats.push(chat)
	}
	
	$scope.$on('sendingChat',function(event,sendChat){
		chat=angular.copy(sendChat)
		chat.from='Me'
			chat.direction='outgoing'
				$scope.addChat(chat)
	})
	
})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
