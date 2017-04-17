echoApp.controller('examCtrl', function ($scope, echo) {

	$scope.show = true;
	$scope.exam;
	$scope.i = -1;

	$scope.formData = {};

	$scope.setExam = function(exam){
		$scope.exam = exam;
	};

	$scope.setI = function(i){
		$scope.i = i;
		console.log(i);
	};

	$scope.getI = function(){
		return $scope.i;
	};


	$scope.toggle = function(){
		$scope.show = !$scope.show;
	}

	$scope.exams = echo.getAllExams().results;






	<!-- SKRÄP -->
	$scope.exercise;
	$scope.answer;
	$scope.setExercise = function(exer){
		$scope.exercise = exer;
	};

	$scope.exercises = echo.getExercises();

	$scope.submit = function(){
		var result = echo.judge($scope.exam);
		alert(result ? "YAY!" : "nej :(");
	}

});
