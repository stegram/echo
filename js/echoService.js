echoApp.factory('echo',function ($resource, $cookieStore, $firebaseArray, $firebaseObject) {
	var currentUser = {};

	this.checkUser = function(username){
		var ref = firebase.database().ref().child('users').child(username);
		return $firebaseObject(ref);
	}

	this.setUser = function(user){
		currentUser = user;
	};

	this.getUser = function(){
		return currentUser;
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
		var ref = firebase.database().ref().child("users").child(this.getUser().$id).child("exams");
		return $firebaseArray(ref);
	}

	this.saveTakenExam = function (exam) {
		// Save the whole exam under the users exams
		var userExams = this.getTakenExams();
		userExams.$add(exam);
	}


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

	this.getAllUsers = function(){
		var ref = firebase.database().ref().child("users");
		return $firebaseArray(ref);
	}

	this.addUser= function (user) {
		var ref = firebase.database().ref().child("users");
		var obj = $firebaseObject(ref);
		ref.child(user).set("null");

	}

  return this;

});
