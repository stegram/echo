echoApp.controller('usersCtrl', function ($scope, echo, $location) {
  if(!echo.getLoggedIn()){
    $location.path('/login');
  }

  $scope.user = {};
  $scope.showAllUsers = true;
  $scope.showUser = false;
  $scope.newUser = "";
  $scope.userExists = false;
  $scope.userWasAdded = false;

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

  $scope.submit = function() {
    $scope.userExists = false;
  	if (!$scope.newUser)
  		return;

    $scope.allUsers.forEach(function (user) {
  		if (user.$id === $scope.newUser){
        $scope.userExists = true;
  		}
    });

    if($scope.userExists )
      return;

    $scope.userExists = false;
    $scope.userWasAdded = true;
  	echo.addUser($scope.newUser);
  };

  $scope.removeUser = function (user){
    echo.removeUser(user);
  };

});
