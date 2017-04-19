echoApp.controller('dashboardCtrl', function ($scope, echo,$location) {

$scope.user = echo.getLoginUser();


$scope.logout = function(){
	
	$('#logout').modal({
		backdrop: 'static',
		keyboard: false
	})
	
	$scope.onExit = true;
	
	if($scope.user.name != undefined){
		echo.lastLogin.update({name:$scope.user.name}, {lastlogin:echo.getCurrentDate()},function(){
			
			$('#logout').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			
			$location.path('/login');
			$scope.onExit = false;
		});
	};
		
};

});
