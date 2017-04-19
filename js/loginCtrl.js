echoApp.controller('loginCtrl', function ($scope, $timeout, $location, echo) {

$scope.user = "";
$scope.show = false;
$scope.accept = false;

$scope.login = function() {
	if (!$scope.user)
		return;

	$scope.loading = true;
	$scope.wrongUser = false;

	var syncObject = echo.checkUser($scope.user);
	//syncObject.$bindTo($scope, "usr");
	syncObject.$loaded(function (user) {
		var exists = user.$value !== null;
		$scope.loading = false;

		if(exists){
			echo.setUser(user);
			echo.setLastLogin();

			if(user.isAdmin)
				$location.path('/users');
			else
				$location.path('/home');
		}else{
			$scope.wrongUser = true;
			$('form').addClass('ahashakeheartache');
			$('form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
				$('form').removeClass('ahashakeheartache');
			});
		}
	});
};


});
