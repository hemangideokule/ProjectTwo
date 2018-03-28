/**
 * 
 */
app.controller('NotificationCtrl',function($scope,$rootScope,$routeParams,notificationService){
	
	var id=$routeParams.id
	function getNotificationNotViewed(){
		notificationService.getNotificationNotViewed().then(
				function(response){
					$rootScope.notifications=response.data
					$rootScope.notificationCount=$rootScope.notifications.length
				}, 
				function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	if(id!=undefined){
		notificationService.getNotification(id).then(
				function(response){
					console.log('id'+id)
					alert('In notificationcontroller.js (by id)')
					$scope.notification=response.data
				},
				function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
				})

	
	notificationService.updateNotification(id).then(
			function(response){
				getNotificationNotViewed()
	},function(response){
		$rootScope.error=response.data
		if(response.status==401)
			$location.path('/login');
	})
}
	getNotificationNotViewed()
	
})