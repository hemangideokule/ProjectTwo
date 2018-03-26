/**
 * 
 */
app.controller('NotificationCtrl',function($scope,$rootScope,notificationService){
	
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
	
	getNotificationNotViewed()
	
	
	
})