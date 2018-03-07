/**
 * 
 */
app.controller('JobCtrl',function($scope,$rootScope,$location,jobService){
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
})