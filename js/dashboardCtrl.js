echoApp.controller('dashboardCtrl', function ($scope, echo,$location,$timeout) {

$scope.user = echo.getLoginUser();


$scope.logout = function(){

	$('#logout').modal({
		backdrop: 'static',
		keyboard: false
	})

	//$scope.onExit = true;

	//if($scope.user.name != undefined){

		echo.setLastLogin();
		//bort

		$timeout(function(){

			$('#logout').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();

			$location.path('/login');
		},1000);

		/*
		echo.lastLogin.update({name:$scope.user.name}, {lastlogin:echo.getCurrentDate()},function(){

		$('#logout').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();

		$location.path('/login');
		$scope.onExit = false;
	});*/
	//};

};

});
