echoApp.controller('dashboardCtrl', function ($scope, echo,$location,$timeout) {

$scope.user = function(){
	return echo.getLoginUser();
};

window.onload = function(){
	var mySidebar = document.getElementById("mySidebar");
}

// Toggle between showing and hiding the sidebar, and add overlay effect
$scope.w3_open = function() {
	if (mySidebar.style.display === 'block') {
		mySidebar.style.display = 'none';
		$scope.overlayBg = false;
	} else {
		mySidebar.style.display = 'block';
		$scope.overlayBg = true;
	}
}

// Close the sidebar with the close button
$scope.w3_close = function() {
	mySidebar.style.display = "none";
	$scope.overlayBg = false;
}

$scope.logout = function(){

	document.getElementById('logout').style.display='block';

		$timeout(function(){
			echo.setLastLogin();
			document.getElementById('logout').style.display='none';
			echo.clearCookies();
			echo.setLoggedIn(false);
			$location.path('/login');
		},1000);

};

});
