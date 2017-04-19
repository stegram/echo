echoApp.controller('simulatorCtrl', function ($scope,echo) {

var user = echo.getLoginUser();
var your_angle = 0;
var correct_angle = 0;
var relError = [];
var labelError = [];
var sessionsPerMonth = [0,0,0,0,0,0,0,0,0,0,0,0];

$scope.showOverview = true;
$scope.showSessions = false;
$scope.showLearn = false;

var barMonthConfig = {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
			datasets: [{
				label: 'Sessions Per Month',
				data: sessionsPerMonth,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	};

var errorConfig = {
		type: 'line',
		data: {
			labels: labelError,
			datasets: [{
				label: 'Rel. Angle Error %',
				data: relError,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1
			}]},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	};

var barMonth = document.getElementById("barChartMonth");

var line = document.getElementById("lineChart");

var barMonthChart = new Chart(barMonth, barMonthConfig);

var lineChart = new Chart(line, errorConfig);

$scope.getSessions = function(){

	$scope.loading = true;

	echo.loggedSessions.get({name:user.name}, function(data){

			$scope.loading = false;

			$scope.sessions = $.map(data, function(value, index) {
				if(typeof value == 'object')
					return [value];
			});;

			var i = 1;

			for(x in $scope.sessions){

				if($scope.sessions[x].date != undefined){

					relError.push(Math.abs(parseInt($scope.sessions[x].your) - parseInt($scope.sessions[x].correct))/parseInt($scope.sessions[x].correct)*100);

					labelError.push(i);
					i++;

					if($scope.sessions[x].date.charAt(5) == "0"){
						sessionsPerMonth[parseInt($scope.sessions[x].date.charAt(6))] += 1;
					}else{
						sessionsPerMonth[parseInt($scope.sessions[x].date.charAt(5) + $scope.sessions[x].date.charAt(6))] += 1;
					};

				};

			};

			lineChart.data.labels = labelError;

			lineChart.data.datasets[0].data = relError;

			lineChart.update();


			barMonthChart.data.datasets[0].data = sessionsPerMonth;

			barMonthChart.update()

			relError = [];
			labelError = [];
			sessionsPerMonth = [0,0,0,0,0,0,0,0,0,0,0,0];

	}, function(data){
			alert("There was an error!");
	});

};

$scope.getSessions();

$scope.logangle = function(your, correct){
	$scope.post = true;
	if(user != undefined){
		echo.angles.log({name:user.name}, {date:echo.getCurrentDate(), your:your, correct:correct}, function(){

			$scope.post = false;
			$scope.getSessions();
		});

	};

};

})
