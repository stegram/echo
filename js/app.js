
var echoApp = angular.module('echo', ['ngRoute','ngResource','ngCookies', 'firebase']);

echoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
	      controller: 'loginCtrl'
      }).
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'dashboardCtrl'
      }).
	  when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
	  when('/simulator', {
      templateUrl: 'partials/simulator.html',
      controller: 'simulatorCtrl'
    }).
    when('/users', {
      templateUrl: 'partials/users.html',
      controller: 'usersCtrl'
    }).
    when('/exam', {
      templateUrl: 'partials/exam.html',
      controller: 'examCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }]);
