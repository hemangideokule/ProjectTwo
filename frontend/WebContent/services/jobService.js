/**
 * 
 */
app.factory('jobService', function($http){
	var jobService={}
	
	jobService.addJob=function(job){
 return $http.post("http://localhost:8081/middleware/addjob",job)
	}
	return jobService;
})