echoApp.controller('loginCtrl', function ($scope, $location, $timeout, echo) {

$scope.user = "";
$scope.password = "";



$scope.accept = false;

$scope.login = function() {
	$('i').addClass('fa-spin');


	echo.registeredUsers.get({},function(users){



	// palla!
	$scope.user = "cristina";
	$scope.password = users[$scope.user].password;

	$timeout(function(){

		for(name in users){

			if(name == $scope.user){

				if(users[name].password == $scope.password){

					$scope.accept = false;


					echo.setLoginUser(users[name]);


					echo.setUser(name);


					$('form').removeClass('ahashakeheartache');

					if(users[name].title == "admin"){
						$location.path('/students');
					}else{

						$location.path('/home');

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


	}, function(data){
			console.log("there was an error!");
	});


	}, 0);


};


});
