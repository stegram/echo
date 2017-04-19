echoApp.factory('echo',function ($resource, $cookieStore, $firebaseArray, $firebaseObject) {

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
		var loggedUser = this.getUser();
		loggedUser.name = loggedUser.$id;
		//loggedUser.lastlogin = this.getCurrentDate();
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





	/* ---------------------------------------------------------------------------*/



	var currentUser = {};

	this.setLastLogin = function() {
		currentUser.lastlogin = this.getCurrentDate();
	};

	this.checkUser = function(username){
		var ref = firebase.database().ref().child('users').child(username);
		return $firebaseObject(ref);
	};

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
			};

			 question.guessedCorrect = angular.equals(question.answers, question.guess);
		});

		exam.passed = exam.questions.every(function (question) {
			return question.guessedCorrect;
		});

		return exam.passed;
	};

	this.getTakenExams = function () {
		// Get all the users taken exams
		var ref = firebase.database().ref().child("users").child(this.getUser().$id).child("exams");
		return $firebaseArray(ref);
	};

	this.saveTakenExam = function (exam) {
		// Save the whole exam under the users exams
		var userExams = this.getTakenExams();
		userExams.$add(exam);
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

	this.getAllUsers = function(){
		var ref = firebase.database().ref().child("users");
		return $firebaseArray(ref);
	};

	this.addUser= function (user) {
		var ref = firebase.database().ref().child("users");
		//var obj = $firebaseObject(ref);
		ref.child(user).set({"first": true});
	};

	this.removeUser = function (user) {
		var ref = firebase.database().ref().child("users");
		ref.child(user).remove();
	};

	this.setFirst = function(bool){
		var ref = firebase.database().ref().child("users");
		ref.child(this.getUser().$id).set({"first": bool});
	};

  return this;

});
