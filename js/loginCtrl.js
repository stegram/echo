echoApp.controller('loginCtrl', function ($scope, $timeout, $location, echo) {

$scope.user = "";
$scope.show = false;
$scope.accept = false;

echo.setLoggedIn(false);
echo.clearCookies();

$scope.login = function() {
	if (!$scope.user)
		return;

	$scope.loading = true;
	$scope.wrongUser = false;

	var syncObject = echo.checkUser($scope.user);

	syncObject.$loaded(function (user) {
		var exists = user.$value !== null;

		$scope.loading = false;

		if(exists){
			echo.setUser(user);
			echo.setLoggedIn(true); //<----------

			if(user.isAdmin)
				$location.path('/users');
			else
				$location.path('/home');
		}else{
			$scope.wrongUser = true;
		}
	});
};

});
