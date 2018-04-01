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
	
	getAllSuggestedUsers()	
	getPendingRequests()
})