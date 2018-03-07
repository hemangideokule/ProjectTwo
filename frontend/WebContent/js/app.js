/**
 * 
 */
var app=angular.module('app',['ngRoute','ngCookies'])
app.config(function($routeProvider)
		{
	$routeProvider
	.when('/register',{
	 templateUrl:'views/registrationForm.html',
	 controller:'UserController'
			})
			
	.when('/login',{
	 templateUrl:'views/login.html',
	 controller:'UserController'
			})
			
   .when('/home',{
	 templateUrl:'views/home.html',
	 controller:'UserController'
			})	
			
	.when('/edituserprofile',{
	 templateUrl:'views/edituserprofile.html',
	 controller:'UserController'
			})	

		.when('/addjob',{
	 templateUrl:'views/jobform.html',
	 controller:'JobCtrl'
			})			
			
	.otherwise({
			 templateUrl:'views/home.html',
	})
	
	
app.run(function ($location,$rootScope,$cookieStore,userService){
	console.log("app.run(1)")
	
	if ($rootScope.loggedInUser==undefined)
		console.log("app.run(2)")
		
		$rootScope.loggedInUser=$cookieStore.get('currentUser')
		console.log("app.run(3)")
	
		$rootScope.logout=function(){
		console.log("app.run(4)")
		
		userService.logout().then(
		function(response){
			delete $rootScope.loggedInUser;
			$cookieStore.remove('currentUser')
			$rootScope.message="SuccessFull Logout"
				alert('Logout Successful. Please Login to Continue')
				$location.path('/login');
		},function(response){
			$scope.error=response.data
			if(response.status=401)
				$location.path=('/login')
			
		})
		}
	})
})