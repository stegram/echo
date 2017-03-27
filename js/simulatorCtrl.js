echoApp.controller('simulatorCtrl', function ($scope) {

$scope.showOverview = true;
$scope.showSessions = false;
$scope.showLog = false;


var bar = document.getElementById("barChart");
var line = document.getElementById("lineChart");

var barChart = new Chart(bar, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
            label: 'Sessions',
            data: [12, 19, 3, 5, 2, 3,7,5,2,8,9,13],
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
});

var lineChart = new Chart(line, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
            label: 'Avg Accuracy',
            data: [12, 19, 3, 5, 2, 3,7,5,2,8,9,13],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
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
});

});