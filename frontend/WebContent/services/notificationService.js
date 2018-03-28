/**
 * 
 */
app.factory('notificationService', function($http){
	var notificationService={}
	
	notificationService.getNotificationNotViewed=function(){
		return $http.get("http://localhost:8081/middleware/getnotifications")
	}
	
	notificationService.getNotification=function(id){
		console.log('In notificationService.js (by id)')
		console.log(id)
		return $http.get("http://localhost:8081/middleware/getnotification/"+id)
	}
	notificationService.updateNotification=function(id){
		return $http.put("http://localhost:8081/middleware/updatenotification/"+id)
	}
 return notificationService;
 })
	