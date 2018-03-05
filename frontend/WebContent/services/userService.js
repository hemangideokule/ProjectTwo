/**
 * 
 */
app.factory('userService', function($http){
	var userService={}
	
	userService.registerUser=function(user){
		alert('entering userservice registerUser()')
		console.log('userservice-->register')
		console.log('in userservice'+user)
		return $http.post("http://localhost:8081/middleware/registeruser",user)
	}
	
	userService.login=function(user){
		console.log('userservice-->login')
	    console.log(user)
	    return $http.post("http://localhost:8081/middleware/login",user)
	
	}
	
	userService.logout=function(){
		console.log('userservice-->logout')
		return $http.put("http://localhost:8081/middleware/logout")
	}
	userService.getUser=function(){
		return $http.get("http://localhost:8081/middleware/getuser")
	}
	
	userService.updateUser=function(user){
		return $http.put("http://localhost:8081/middleware/updateuser",user)
	}
	
	
	
	return userService;
	
	})