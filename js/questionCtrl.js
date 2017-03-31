echoApp.controller('questionCtrl', function ($scope, echo) {
	
$scope.user = echo.getUser();

});