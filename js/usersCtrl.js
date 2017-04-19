echoApp.controller('usersCtrl', function ($scope, echo) {
$scope.user = {};
$scope.showAllUsers = true;
$scope.showUser = false;

$scope.setUser = function(user){
	$scope.user = user;
};

$scope.toggleAllUsers = function(){
	$scope.showAllUsers = !$scope.showAllUsers;
};

$scope.toggleUser = function(){
	$scope.showUser  = !$scope.showUser;
};

$scope.allUsers = echo.getAllUsers();

$scope.newUser = "";
$scope.userExists = true;


$scope.submit = function() {
	if (!$scope.newUser)
		return;

	$scope.allUsers.forEach(function (user) {
		if (user.$id === $scope.newUser){
			return;
		}
	});

	echo.addUser($scope.newUser);
	//$scope.allUsers.$add($scope.newUser);
};

});
