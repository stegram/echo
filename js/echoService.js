echoApp.factory('echo',function ($resource, $cookieStore, $firebaseArray, $firebaseObject) {



	//id should prob be user names


	//var user = "cristina"; // palla!

	var echoUsers = {
		'cristina' : {'title' : "bma", 'password' : "hejhej", 'lastlogin' : "2017-03-29",
			'data' : {}},
		'admin' : {'title' : "admin", 'password' : "null", 'lastlogin' : "2017-03-29",
			'data' : {}}
	};

	this.getRegisteredUsers = function(){
		return echoUsers;
	};

	this.checkUser = function(username){
		var ref = firebase.database().ref().child('users').child(username);
		return $firebaseObject(ref);
	}

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

		exam.questions.forEach(function (question) {
			question.rights = [];
			question.wrongs = [];

			if (question.type === "radio") {
				question.alternatives.forEach(function (alternative, index) {
					question.rights.push((question.guess === index && question.guess === question.answers) || (question.guess !== index && question.answers === index));
					question.wrongs.push(question.guess === index && question.guess !== question.answers);
				});
			} else if (question.type === "checkbox") {
				question.alternatives.forEach(function (alternative, index) {
					question.rights.push(question.answers[index]);
					question.wrongs.push(question.guess[index] === true && question.guess[index] !== question.answers[index]);
				});
			}

			 question.guessedCorrect = angular.equals(question.answers, question.guess);
		});

		exam.passed = exam.questions.every(function (question) {
			return question.guessedCorrect;
		});

		return exam.passed;
	}

	this.getTakenExams = function () {
		// Get all the users taken exams
		var ref = firebase.database().ref().child("users").child(this.getUser().name).child("exams");
		return $firebaseArray(ref);
	}

	this.saveTakenExam = function (exam) {
		// Save the whole exam under the users exams
		var userExams = this.getTakenExams();
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
			var exams = $firebaseArray(ref);
			var userExams = this.getTakenExams();

			userExams.$watch(function () {
				exams.$loaded(function () {
						exams.forEach(function (exam) {
							exam.attempts = userExams.filter(function (userExam) {
								return userExam.id === exam.id;
							}).length;
						});
				});
			});

			return exams;
	};

	var getImage = {
	};



  return this;

});
