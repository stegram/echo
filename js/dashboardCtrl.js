echoApp.controller('dashboardCtrl', function ($scope, echo) {

$scope.user = echo.getLoginUser();


$scope.admin = function(){
	if($scope.user.title == "admin"){
		return true;
	}else{
		return false;
	};
};

//echo.lastLogin.update({name:$scope.user.name}, {lastlogin:"greek"});

$scope.logout = function(){
	if($scope.user.name != undefined)
		echo.lastLogin.update({name:$scope.user.name}, {lastlogin:echo.getCurrentDate()});
};

});