/**
 * 
 */
app.factory('blogService', function($http){
	var blogService={}
	
	blogService.addBlog=function(blog){
		alert('entering blogpostservice.js')
		return $http.post("http://localhost:8081/middleware/addblogpost",blog)
	}

	blogService.getBlogsWaitingForApproval=function(){
		alert('entering blogpostservice.js')
		return $http.get("http://localhost:8081/middleware/getblogs/"+0)
	}
	blogService.getBlogApproved=function(){
		alert('entering blogpostservice.js')
		return $http.post("http://localhost:8081/middleware/getblogs/"+1)
	}
	
	
	return blogService;
})