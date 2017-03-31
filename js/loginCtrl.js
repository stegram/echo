echoApp.controller('loginCtrl', function ($scope, $timeout,$location, echo) {

$scope.user = "";
$scope.password = "";

$scope.show = false;

$scope.accept = false;
var users = echo.getRegisteredUsers();

$scope.login = function() {
	$('i').addClass('fa-spin');
	
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
						$location.path('/questions');
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
	}, 2000);
	
};


});