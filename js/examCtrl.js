echoApp.controller('examCtrl', function ($scope, $firebaseArray, echo) {

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

	var ref = firebase.database().ref().child("exams");
	$scope.exams = $firebaseArray(ref);



	<!-- SKRÄP -->
	$scope.exercise;
	$scope.answer;
	$scope.setExercise = function(exer){
		$scope.exercise = exer;
	};

	$scope.exercises = echo.getExercises();

	$scope.submit = function(){
		var result = echo.judge($scope.exam);
		// Doesn't work: $scope.exams.$save();
		alert(result ? "YAY!" : "nej :(");
	}

});
