echoApp.controller('studentsCtrl', function ($scope) {

$scope.student = 1;
$scope.show = false;

$scope.setStudent = function(x){
	$scope.student = x;
};

$scope.setShow = function(s){
	$scope.show = s;
};

});