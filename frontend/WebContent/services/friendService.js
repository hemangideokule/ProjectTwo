/**
 * 
 */
app.factory('friendService',function($http){
	
	var friendService={}
	
	friendService.getAllSuggestedUsers=function(){
		return $http.get("http://localhost:8081/middleware/suggestedusers");
	}
	
	friendService.addFriend=function(toId){
		return $http.post("http://localhost:8081/middleware/addfriend",toId);
	}
	
	friendService.getPendingRequests=function(){
		return $http.get("http://localhost:8081/middleware/pendingrequests")
	}
	return friendService;
})