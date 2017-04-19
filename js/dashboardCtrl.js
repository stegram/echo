echoApp.controller('dashboardCtrl', function ($scope, echo) {

$scope.user = echo.getLoginUser();

$scope.logout = function(){
	if($scope.user.name != undefined)
		echo.lastLogin.update({name:$scope.user.name}, {lastlogin:echo.getCurrentDate()});
};

});
