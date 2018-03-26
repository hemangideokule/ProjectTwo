/**
 * 
 */
app.factory('notificationService', function($http){
	var notificationService={}
	
	notificationService.getNotificationNotViewed=function(){
		alert('entering notificationservice.js')
		return $http.get("http://localhost:8081/middleware/getnotifications")
	}
	
 return notificationService;
 })
	