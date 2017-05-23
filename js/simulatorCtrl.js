echoApp.controller('simulatorCtrl', function ($scope,echo, $location) {
	if(!echo.getLoggedIn()){
		$location.path('/login');
	}

var user = echo.getUserId();
var your_angle = 0;
var correct_angle = 0;
var relError = [];
var labelError = [];
var sessionsPerMonth = [0,0,0,0,0,0,0,0,0,0,0,0];

$scope.freq = true;
$scope.logbok = true;

$scope.week = true;

$scope.showOverview = true;
$scope.showSessions = false;
$scope.showLearn = false;

function getWeek(month,day){
	for(var i = 1; i <= 12; i++){
		if(month == i){

		};
	};
};

var barMonthConfig = {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
			datasets: [{
				type: 'bar',
				data: sessionsPerMonth,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true,
						suggestedMax:10
					}
				}],
				xAxes: [{
					ticks: {
						maxTicksLimit: 10,
						maxRotation: 0
					}
				}]
			}
		}
	};

var barMonth = document.getElementById("barChartMonth");
var barMonthChart = new Chart(barMonth, barMonthConfig);


$scope.getSessions = function(){

	$scope.loading = true;

	echo.loggedSessions.get({name:user}, function(data){
			relError = [];
			labelError = [];
			sessionsPerMonth = [0,0,0,0,0,0,0,0,0,0,0,0];

			$scope.loading = false;

			$scope.sessions = [];

			for(x in data){
				if(typeof data[x] == 'object')
					$scope.sessions.push(data[x]);
			};

			$scope.sessions.pop(); //remove c object from array

			var i = 1;

			for(x in $scope.sessions){

				if($scope.sessions[x].date != undefined){

					relError.push(Math.abs(parseInt($scope.sessions[x].your) - parseInt($scope.sessions[x].correct))/parseInt($scope.sessions[x].correct)*100);

					labelError.push(i);
					i++;

					if($scope.sessions[x].date.charAt(5) == "0"){
						sessionsPerMonth[parseInt($scope.sessions[x].date.charAt(6)) - 1] += 1;
					}else{
						sessionsPerMonth[parseInt($scope.sessions[x].date.charAt(5) + $scope.sessions[x].date.charAt(6)) - 1] += 1;
					};

				};

			};

			if($scope.freq == true){
				barMonthChart.data.datasets[0].data = sessionsPerMonth;
			}else{
				barMonthChart.data.datasets[0].data = relError;
				barMonthChart.data.labels = labelError;
			};

			barMonthChart.update();

	}, function(data){
			alert("There was an error!");
	});

};

$scope.getSessions();

$scope.switchAxis = function(interval){
	var weeks = [];

	for(var i = 1; i <= 52; i++)
		weeks.push(i);

	if(interval == "week"){
		barMonthChart.data.labels = weeks;
		barMonthChart.update();
	}else{
		barMonthChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		barMonthChart.update();
	};
};

$scope.switchGraph = function(graph){
	if(graph == "error"){
		barMonthChart.data.datasets[0] = {
				type: 'line',
				data: relError,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				fill: false
			};
		barMonthChart.options.scales.xAxes[0].gridLines.offsetGridLines = false;
		barMonthChart.data.labels = labelError;
		barMonthChart.update();
	}else{
		barMonthChart.data.datasets[0] = {
				type: 'bar',
				data: sessionsPerMonth,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1
			};

		barMonthChart.options.scales.xAxes[0].gridLines.offsetGridLines = true;
		barMonthChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		$scope.week = true;
		barMonthChart.update();
	};
};

$scope.logangle = function(your, correct){
	$scope.post = true;
	if(user != undefined){
		echo.angles.log({name:user}, {date:echo.getCurrentDate(), your:your, correct:correct}, function(){

			$scope.post = false;
			$scope.getSessions();
		});

	};

};

})
