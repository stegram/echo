echoApp.controller('homeCtrl', function ($scope, echo, $location) {
	if(!echo.getLoggedIn()){
		$location.path('/login');
	}

	function user(){
		return echo.getLoginUser();
	};

	$scope.profile = false;

	$scope.getForm = function(){
		$scope.loading = true;
		echo.firstQuestions.get({name:user().$id}, function(data){

			$scope.profession = data.profession;
			$scope.practised = data.practised;

			$scope.sessionsPerYear = data.sessionsPerYear;
			$scope.sessionsPerMonth = data.sessionsPerMonth;
			$scope.sessionsPerWeek = data.sessionsPerWeek;

			$scope.answersPerYear = data.answersPerYear;
			$scope.answersPerMonth = data.answersPerMonth;
			$scope.answersPerWeek = data.answersPerWeek;

			$scope.writing = data.writing;
			$scope.supervision = data.supervision;

			$scope.loading = false;

		}, function(){
			alert("there was an error!");
		});

	};

	$scope.sendForm = function(profession,practised,sessionsPerYear,sessionsPerMonth,sessionsPerWeek,answersPerYear,answersPerMonth,answersPerWeek,writing,supervision){

		$scope.post = true;

			echo.firstSubmit.submit({name:user().$id}, {profession:profession,practised:practised,sessionsPerYear:sessionsPerYear,sessionsPerMonth:sessionsPerMonth,sessionsPerWeek:sessionsPerWeek,answersPerYear:answersPerYear,answersPerMonth:answersPerMonth,answersPerWeek:answersPerWeek,writing:writing,supervision:supervision}, function(){

				// Set first in other databse (user and exam database)
				echo.setFirst(false);

				$scope.post = false;
				$scope.getForm();

				document.getElementById('firstModal').style.display='none';

			});

	};

	if(user().first == true){
		document.getElementById('firstModal').style.display='block';
	}else{
		if(user().first == undefined){

			if(echo.getFirst() == true){
				document.getElementById('firstModal').style.display='block';
			}else{
				document.getElementById('firstModal').style.display='none';
			};
		};
	};

});
