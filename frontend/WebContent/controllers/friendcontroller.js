/**
 * 
 */
app.controller('FriendCtrl',function($scope,$location,$rootScope,friendService)
		{
	
	function getAllSuggestedUsers(){
		friendService.getAllSuggestedUsers().then(
			function(response){
				$scope.suggestedUsers=response.data
			},
			function(response){
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')
			})
}
	
	function getPendingRequests(){
		friendService.getPendingRequests().then(
				function(response){
					$scope.pendingRequests=response.data
				},
				function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
				})
				
	}
	
	
	$scope.addFriend=function(toId){
		friendService.addFriend(toId).then(
				function(response){
					alert('Friend request has been sent successfully')
					console.log('addFriend')
					getAllSuggestedUsers()	
					console.log('getAllSuggestedUsers()	')
				},
				function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	$scope.acceptRequest=function(request){
		friendService.acceptRequest(request).then(function(response){
			alert('Friend Request Accepted..!!')
		getPendingRequests()	
		}, function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		
		})
	}
	
	$scope.deleteRequest=function(request){
		friendService.deleteRequest(request).then(function(response){
			alert('Friend Request Deleted..!!')
		getPendingRequests()	
		}, function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		
		})
	}
	
	friendService.getAllFriends().then(function(response){
		$scope.friends=response.data
	},function(response){
		$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
	})
	
	getAllSuggestedUsers()	
	getPendingRequests()
})