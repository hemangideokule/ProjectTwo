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
	.otherwise({
			 templateUrl:'views/home.html',
	})
	
	
	app.run(function($location,$rootScope,$cookieStore,userService){
		if(rootScope.loggedInUser==undefined)
			$rootScope.loggedInUser=$cookieStore.get('currentUser')
			
			$rootScope.logout=function(){
			userService.logout().then(
		function(response){
			delete $rootScope.remove('currentUSer')
			$rootScope.message="Successfully LoggedOut..!!"
				$location.path('/login')
				
		},function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
			
		}
			)
		}
	})
		})