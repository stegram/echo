echoApp.controller('dashboardCtrl', function ($scope, echo) {

$scope.user = echo.getUser();

$scope.admin = function(){
	if($scope.user.title == "admin"){
		return true;
	}else{
		return false;
	};
};


});