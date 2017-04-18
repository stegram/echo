echoApp.controller('loginCtrl', function ($scope,$location, echo) {

$scope.user = "";
$scope.password = "";

//$scope.show = false;

$scope.accept = false;

$scope.login = function() {
	$('i').addClass('fa-spin');
	
	echo.registeredUsers.get({},function(users){

		for(name in users){

			if(name == $scope.user){

				if(users[name].password == $scope.password){
					
					$scope.accept = false;
					
					echo.setLoginUser(users[name]);
					
					$('form').removeClass('ahashakeheartache');
					
					if(users[name].title == "admin"){
						$location.path('/students');
					}else{
						$location.path('/home');
					};

					return;
				};
			};
				
		};
		
		$('form').addClass('ahashakeheartache');
		
		$('form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
			$('form').delay(200).removeClass('ahashakeheartache');
		});
		
		$scope.accept = true;
		$('i').removeClass('fa-spin');
		
	}, function(data){
			console.log("there was an error!");
	});
	
};


});