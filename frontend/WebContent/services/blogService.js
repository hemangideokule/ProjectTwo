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
		//alert('entering blogservice.js(waitingForApproval)')
		return $http.get("http://localhost:8081/middleware/getblogs/"+0)
	}
	blogService.getBlogApproved=function(){
		//alert('entering blogservice.js(approved)')
		return $http.get("http://localhost:8081/middleware/getblogs/"+1)
	}
	
	blogService.getBlog=function(id){
	    return $http.get("http://localhost:8081/middleware/getblog/"+id)
	}
	
	blogService.approve=function(blog){
		//blog.approved=0
	    return $http.put("http://localhost:8081/middleware/approve/",blog)
	    //blog.approved=1
	}
	
	blogService.reject=function(blog,rejectionReason){
		//blog.approved=0
	    return $http.put("http://localhost:8081/middleware/reject/"+rejectionReason,blog)
	    //blog.approved=delete
	}
	
	return blogService;
})