echoApp.factory('echo',function ($resource, $cookieStore, $firebaseArray, $firebaseObject) {

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

	var sessions = {};

	this.loggedSessions = $resource('https://test-fcf8a.firebaseio.com/data/:name/simulator/.json');

	this.firstQuestions = $resource('https://test-fcf8a.firebaseio.com/data/:name/firstQuestions/.json');

	this.angles = $resource('https://test-fcf8a.firebaseio.com/data/:name/simulator/.json',{},{
		log: {method: 'POST'}
	});

	this.firstSubmit = $resource('https://test-fcf8a.firebaseio.com/data/:name/firstQuestions/.json',{},{
		submit: {method: 'PATCH'}
	});

	this.getCurrentDate = function(){
		return date;
	};

	/* ---------------------------------------------------------------------------*/

	this.setLoggedIn = function(bool){
		if (bool){
			$cookieStore.put('loggedIn','loggedIn');
		}else {
			$cookieStore.remove('loggedIn');
		}
	}

	this.getLoggedIn = function(){
		return $cookieStore.get('loggedIn');
	}

	var currentUser = {};
	var userId ="";
	var first = true;

	this.checkUser = function(username){
		var ref = firebase.database().ref().child('users').child(username);
		return $firebaseObject(ref);
	};

	if (!$cookieStore.get('userId')){
		$cookieStore.put('userId',userId);
	}else{
		userId = $cookieStore.get('userId');
	};

	if ($cookieStore.get('first') == undefined){
		$cookieStore.put('first',first);
	}else{
		first = $cookieStore.get('first');
	};

	this.clearCookies = function(){
		$cookieStore.remove('userId');
		$cookieStore.remove('first');
	};

	this.setUser = function(user){
		currentUser = user;
		userId = currentUser.$id;
		$cookieStore.put('userId',currentUser.$id);

		first = currentUser.first;
		$cookieStore.put('first',currentUser.first);
	};

	this.getUserId = function(){
		return userId;
	};

	this.setLastLogin = function() {
		var ref = firebase.database().ref().child("users");
		ref.child(this.getUser().$id).child("lastLogin").set(this.getCurrentDate());

	};

	this.getUser = function(){
		if(currentUser.$id != undefined){
			return currentUser;
		}else{
			var syncObject = this.checkUser(userId);
			return syncObject.$loaded(function (user) {

				currentUser = user;
				$cookieStore.put('userId',currentUser.$id);

				return currentUser;

			});
		};
	};

	//interface between code from stefan and robin
	this.getLoginUser = function(){
		return this.getUser();
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
		var ref = firebase.database().ref().child("users").child(userId).child("exams");
		return $firebaseArray(ref);
	};

	this.saveTakenExam = function (exam) {
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

	this.getAllUsers = function(){
		var ref = firebase.database().ref().child("users");
		return $firebaseArray(ref);
	};

	this.addUser= function (user) {
		var ref = firebase.database().ref().child("users");
		ref.child(user).set({"first": true});
	};

	this.removeUser = function (user) {
		var ref = firebase.database().ref().child("users");
		ref.child(user).remove();
	};

	this.setFirst = function(bool){
		$cookieStore.put('first',bool);

		first = bool;

		var ref = firebase.database().ref().child("users");
		ref.child(userId).set({"first": bool});
	};

	this.getFirst = function(){
		return first;
	}

  return this;

});
