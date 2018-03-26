/**
 * 
 */
app.factory('jobService', function($http){
	var jobService={}
	
	jobService.addJob=function(job){
 return $http.post("http://localhost:8081/middleware/addjob",job)
	}
	
	jobService.getAllJobs=function(){
		 return $http.get("http://localhost:8081/middleware/alljobs");
			}
	
	jobService.getJob=function(id){
		alert(' finding job by id')
		 return $http.get("http://localhost:8081/middleware/getjob/"+id)
			}
	return jobService;
})