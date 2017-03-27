echoApp.controller('excerciseCtrl', function ($scope) {

$scope.excercise = 1;
$scope.show = false;

$scope.setExcercise = function(x){
	$scope.excercise = x;
};

$scope.setShow = function(s){
	$scope.show = s;
};

});