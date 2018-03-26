/**
 * 
 */
app.controller('BlogDetailsCtrl',function($scope,$rootScope,$sce,$location,blogService,$rootScope,$routeParams){

	var id=$routeParams.id;
	$scope.rejectionTxt=false;
	
	blogService.getBlog(id).then(
			function(response){
				$scope.blog=response.data
				$scope.content=$sce.trustAsHtml($scope.blog.blogContent)
			},function(response){
				$rootScope.status=response.data
				console.log('error in blogdetailctrl')
				if(response.status==401)
					$location.path('/login')
			})
			
			
    $scope.approve=function(blog){
	      //blog.approved=0
		blogService.approve(blog).then(function(response){
			$location.path('/blogsnotapproved')
		}, function(response){
			$rootScope.status=response.data
			if(response.status==401)
				$location.path('/login')
		})
		
	}			
    
	$scope.reject=function(blog){
		//blog.approved=1
		blogService.reject(blog,$scope.rejectionReason).then(function(response){
			$location.path('/blogsnotapproved')
		}, function(response){
			$rootScope.status=response.data
			if(response.status==401)
				$location.path('/login')
	})
	}
	
	$scope.showRejectionTxt=function(){
			$scope.rejectionTxt=true;
		}

	
})