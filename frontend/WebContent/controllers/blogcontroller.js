/**
 * 
 */
app.controller('BlogCtrl',function($scope,$rootScope,$location,blogService){

$scope.addBlog=function(blog){
	blogService.addBlog(blog).then(
			function(response){
				alert('entering blogpostcontroller.js');
			alert('BlogPost Added and Waiting for Approval');
			$location.path('/home')	
			},
			function(response){
				console.log('error in blogpostcontroller.js')
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')		
			})
}

if($rootScope.loggedInUser.role=='ADMIN')
blogService.getBlogsWaitingForApproval().then(
			function(response){
				//alert('entering getBlogsWaitingForApproval()')
				console.log('getBlogsWaitingForApproval')
					console.log(response.data)
				$scope.blogsWaitingForApproval=response.data
			
			}, function(response){
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')
			})

blogService.getBlogApproved().then(
		function(response){
			//alert('entering getBlogApproved()')
			console.log('getBlogApproved')
			
			$scope.blogsApproved=response.data
		}, function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		})

})