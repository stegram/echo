echoApp.controller('loginCtrl', function ($scope, $timeout, $location, echo) {

$scope.user = "";
$scope.password = "";

$scope.show = false;

$scope.accept = false;
var users = echo.getRegisteredUsers();

$scope.login = function() {
	$('i').addClass('fa-spin');

	// palla!
	$scope.user = "cristina";
	$scope.password = users[$scope.user].password;

	$timeout(function(){
		for(name in users){
			if(name == $scope.user){
				if(users[name].password == $scope.password){

					$scope.accept = false;
					echo.setUser(name);

					$('form').removeClass('ahashakeheartache');

					if(users[name].title == "admin"){
						$location.path('/students');
					}else{
						$location.path('/exam');
					};

					return;
				};
			};

		};

		$('form').addClass('ahashakeheartache');

		$('form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
			$('form').delay(0).removeClass('ahashakeheartache');
		});

		$scope.accept = true;
		$('i').removeClass('fa-spin');
	}, 0);

};


});
