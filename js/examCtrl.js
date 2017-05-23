echoApp.controller('examCtrl', function ($scope, echo, $location) {
	if(!echo.getLoggedIn()){
		$location.path('/login');
	}

	$scope.showExamList = true;
	$scope.showOldExams = false;
	$scope.exam;
	$scope.i = -1;
	$scope.isSubmitted = false;

	$scope.toggleExamList = function(){
		$scope.showExamList = !$scope.showExamList;
	}

	$scope.toggleOldExams = function(){
		$scope.showOldExams = !$scope.showOldExams;
	}

	$scope.setExam = function(exam){
		$scope.exam = exam;
	};

	$scope.setI = function(i){
		$scope.i = i;
	};

	$scope.getI = function(){
		return $scope.i;
	};

	$scope.exams = echo.getAllExams();

	$scope.getExams = function(){
		if($scope.showOldExams) {
			$scope.exams = echo.getTakenExams();
		}else if (!$scope.showOldExams){
		$scope.exams = echo.getAllExams();
		} else {
			//console.console.log("badshit");
		}

	};

	$scope.back = function(){
		$scope.isSubmitted = false;
	};

	$scope.submit = function(){
		var result = echo.judge($scope.exam);
		echo.saveTakenExam($scope.exam);
		$scope.isSubmitted = true;
	}

});
