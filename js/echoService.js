echoApp.factory('echo',function ($resource, $cookieStore, $firebaseArray) {



	//id should prob be user names


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
