/**
 * 
 */
app.factory('userService', function($http){
	var userService={}
	
	userService.registerUser=function(user){
		alert('entering userservice registerUser()')
		
		console.log('in userservice'+user)
		return $http.post("http://localhost:8081/middleware/registeruser",user)
	}
	
	userService.login=function(user){
		console.log('userservice-->login')
	    console.log(user)
	    return $http.post("http://localhost:8081/middleware/login",user)
	
	}
	
	userService.logout=function(user){
		console.log('userservice-->logout')
	    console.log(user)
	    return $http.put("http://localhost:8081/middleware/logout",user)
	}
	return userService;
	
	})