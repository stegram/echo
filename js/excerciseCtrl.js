echoApp.controller('excerciseCtrl', function ($scope, echo) {

$scope.show = true;
$scope.exercise;
$scope.answer;

$scope.toggle = function(){
	$scope.show = !$scope.show;
}

$scope.setExercise = function(exer){
	$scope.exercise = exer;
};

$scope.exercises = echo.getExercises();

$scope.submit = function(){

}

});
