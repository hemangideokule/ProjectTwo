/**
 * 
 */
app.controller('JobCtrl',function($scope,$rootScope,$location,jobService,$routeParams){
	var id=$routeParams.id
	$scope.addJob=function(job){
		
		jobService.addJob(job).then(
		function(response){
			console.log('jobController')
			alert('Job Details Added Successfully')
			$location.path('/home')
		},function(response){
			$rootScope.status=response.data
			console.log('error in jobController')
			if(response.status==401)
				$location.path('/login')
		})
		
	
}
	jobService.getAllJobs().then(function(response){
		$scope.jobs=response.data
	
	},function(response){
		$rootScope.error=response.data
		console.log('error in getAllJobs')
		if(response.status==401)
			$location.path('/login')
		
	})
	
	if(id!=undefined){
		console.log(' finding job by id')
		alert(' finding job by id')
	jobService.getJob(id).then(function(response){
		$scope.job=response.data
	}, function(response){
		$rootScopee.error=response.data
		if(response.status==401)
			$location.path('/login')
	})
	
}
	
})