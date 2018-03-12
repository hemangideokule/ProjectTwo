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
			.when('/alljobs',{
		templateUrl:'views/joblist.html',
		controller:'JobCtrl'
	})
			
	.otherwise({
			 templateUrl:'views/home.html',
	})
		})
			
	
app.run(function ($location,$rootScope,$cookieStore,userService){
	console.log("app.run(1)")
	
	if ($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get('currentUser')
		cosole.log('entering app.run')
		$rootScope.logout=function(){
		cosole.log('entering log out')
		userService.logout().then(	
		function(response){
			delete $rootScope.loggedInUser;
			$cookieStore.remove('currentUser')
			$rootScope.message="SuccessFully LoggedOut"
				alert('Logout Successful. Please Login to Continue')
				$location.path('/login');
		},
		function(response){
			$rootScope.error=response.data
			if(response.status=401)
				cosole.log('error')
				$location.path('/login');
			
		})
		}
	})

