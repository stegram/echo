echoApp.controller('homeCtrl', function ($scope, echo) {

var user = echo.getLoginUser();

function getForm(){
	$scope.loading = true;
	echo.firstQuestions.get({name:user.name}, function(data){

		$scope.loading = false;
		$scope.profession = data.profession;
		$scope.year = data.year;
		$scope.month = data.month;

	}, function(){
		alert("there was an error!");
	});

};

$scope.sendForm = function(profession,year,month){

	$scope.post = true;
	//if(user != undefined){
		user.first = false;

		echo.firstSubmit.submit({name:user.name}, {profession:profession, year:year, month:month}, function(){

			// bort
			//echo.updateUser.update({name:user.name},{first:user.first});

			// Set first in other databse (user and exam database)
			echo.setFirst(false);

			$scope.post = false;
			getForm();
			$('#myModal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		});

	//};

};

if(user.first == true){
	$('#myModal').modal({
		backdrop: 'static',
		keyboard: false
	})

}else{
	getForm();
};

});
