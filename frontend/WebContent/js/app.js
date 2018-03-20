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
	
	.when('/getjob/:id',{
	 templateUrl:'views/jobdetail.html',
	 controller:'JobCtrl'
			})	
		
	.when('/addblog',{
	 templateUrl:'views/blogform.html',
	 controller:'BlogCtrl'
			})	
			
			.when('/blogsnotapproved',{
	 templateUrl:'views/blogsnotapproved.html',
	 controller:'BlogCtrl'
			})	
			
				
			.when('/blogsapproved',{
	 templateUrl:'views/blogsapproved.html',
	 controller:'BlogCtrl'
			})	
	.otherwise({
			 templateUrl:'views/home.html',
	})
		})
			
	
app.run(function ($location,$rootScope,$cookieStore,userService){
	console.log("app.run(1)")
	
	if ($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get('currentUser')
		console.log('entering app.run')
		$rootScope.logout=function(){
		console.log('entering log out')
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
				console.log('error')
				$location.path('/login');
			
		})
		}
	})

