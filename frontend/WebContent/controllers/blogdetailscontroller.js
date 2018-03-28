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
	
    blogService.hasUserLikedBlog(id).then(
    		function(response){
    			if(response.data=='')
    			$scope.isLiked=false
    			else
    				$scope.isLiked=true	
    	   },function(response){
    		$rootScope.status=response.data
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
	
	$scope.updateLikes=function(id){
		blogService.updateLikes(id).then(function(response){
			$scope.blog=response.data//updated blodpost likes
			$scope.isLiked=!$scope.isLiked
		},function(response){
			$rootScope.status=response.data
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	$scope.addComment=function(id,commentTxt){
	blogService.addComment(id,commentTxt).then(
				function(response){
					console.log('addcomment in controller')
					$scope.blogComment=response.data
					getBlogComments(id)
					$scope.commentTxt=''
				},function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
						else{
							$scope.exceptionMessage=response.data
						}
							
				})
	}
         /* video till 0.39.02*/
	
})