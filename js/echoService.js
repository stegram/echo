echoApp.factory('echo',function ($resource, $cookieStore, $firebaseArray) {



	//id should prob be user names


	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd='0'+dd
	}

	if(mm<10) {
		mm='0'+mm
	}

	var date = yyyy + '-' + mm + '-' + dd;

	var user = {};
	var sessions = {};

	this.registeredUsers = $resource('https://test-fcf8a.firebaseio.com/users/.json');

	this.loggedSessions = $resource('https://test-fcf8a.firebaseio.com/data/:name/simulator/.json');

	this.firstQuestions = $resource('https://test-fcf8a.firebaseio.com/data/:name/firstQuestions/.json');

	this.getSessions = function(){
		return sessions;
	};

	this.saveSessions = function(set){
		sessions = set;
	};

	this.setLoginUser = function(selected){
		user = selected;
	};

	this.getLoginUser = function(){
		var loggedUser = echoUsers[user];
		loggedUser.first = false;
		loggedUser.name = user;
		return loggedUser;
	};

	this.lastLogin = $resource('https://test-fcf8a.firebaseio.com/users/:name/.json',{},{
		update: {method: 'PATCH'}
	});

	this.angles = $resource('https://test-fcf8a.firebaseio.com/data/:name/simulator/.json',{},{
		log: {method: 'POST'}
	});

	this.firstSubmit = $resource('https://test-fcf8a.firebaseio.com/data/:name/firstQuestions/.json',{},{
		submit: {method: 'PATCH'}
	});

	this.updateUser = $resource('https://test-fcf8a.firebaseio.com/users/:name/.json',{},{
		update: {method: 'PATCH'}
	});

	this.getCurrentDate = function(){
		return date;
	};


	var user = "cristina"; // palla!

	var echoUsers = {
		'cristina' : {'title' : "bma", 'password' : "hejhej", 'lastlogin' : "2017-03-29",
			'data' : {}},
		'robin' : {'title' : "admin", 'password' : "null", 'lastlogin' : "2017-03-29",
			'data' : {}}
	};

	this.getRegisteredUsers = function(){
		return echoUsers;
	};

	this.setUser = function(name){
		user = name;
	};

	this.getUser = function(){

		var loggedUser = echoUsers[user];

		loggedUser.name = user;

		return loggedUser;

	};

	this.judge = function (exam) {
		exam.submitted = (new Date()).toJSON();

		exam.passed = exam.questions.every(function (question) {
			 question.guessedCorrect = angular.equals(question.answers, question.guess);
			 return question.guessedCorrect;
		});

		return exam.passed;
	}

	this.saveTakenExam = function (exam) {
		// Save the whole exam under the users exams
		var ref = firebase.database().ref().child("users").child(this.getUser().name).child("exams");
		var userExams = $firebaseArray(ref);
		userExams.$add(exam);
	}


	this.getExercises = function(){
		return [
			{"id":"1", "text":"...................", "type":"radio",
				"alt":["wrong1", "wrong2", "wrong3", "correct"], "answer":"correct", "img":"images/chamber.gif"},
			{"id":"2", "text":".....................", "type":"checkbox",
				"alt":["wrong1", "sant1", "wrong2", "sant2"], "answer":["correct1", "correct2"], "img":"images/chamber.gif"},
			{"id":"3", "text":".................", "type":"text", "alt":[], "answer":"correct", "img":"images/ds.jpg"},
			{"id":"4", "text":"....................", "type":"text", "alt":[], "answer":"correct", "img":"images/ds.jpg"}
		];
	};

	this.getExam = function(){

	};

	this.getAllExams = function(){
			var ref = firebase.database().ref().child("exams");
			return $firebaseArray(ref);
	};

	var getImage = {
	};



  return this;

});
