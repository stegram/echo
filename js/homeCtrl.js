echoApp.controller('homeCtrl', function ($scope, echo) {

var user = echo.getLoginUser();

function getForm(){
	$scope.loading = "loading...";
	echo.firstQuestions.get({name:user.name}, function(data){
		
		$scope.loading = "";
		$scope.profession = data.profession;
		$scope.year = data.year;
		$scope.month = data.month;
		
	}, function(){
		alert("there was an error!");
	});
	
};

$scope.sendForm = function(profession,year,month){
	
	$scope.post = "posting...";
	if(user != undefined){
		user.first = false;
		
		echo.firstSubmit.submit({name:user.name}, {profession:profession, year:year, month:month}, function(){
			
			echo.updateUser.update({name:user.name},{first:user.first});
			
			$scope.post = "succesful!";
			getForm();
			$("#myModal").modal("hide");
		});
		
	};
	
};

if(user.first == true){
	$("#myModal").modal()
	
}else{
	getForm();
};

});