echoApp.controller('questionCtrl', function ($scope, echo) {

$scope.user = echo.getUser();
$scope.userName = echo.getUser().$id;

});
