echoApp.factory('echo',function ($resource, $cookieStore) {



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
		exam.submitted = new Date();

		return exam.questions.every(function (question) {
			 question.guessedCorrect = angular.equals(question.answers, question.guess);
			 return question.guessedCorrect;
		});
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
		return {
			results:[
				{
					"id": "1",
					"imageTitle":"image title 1",
					"imageText": "imageText 1",
					"imageUrl": "images/chamber.gif",
					"questions": [
						{
							"id":"1",
							"text":"How many fingers does the human have?",
							"type":"radio",
							"alternatives": ["1", "5", "10", "20"],
							"answers": 2,
							"guess": null
						},
						{
							"id":"2",
							"text":"Which of these animal are mammals?",
							"type":"checkbox",
							"alternatives":["fish", "dog", "insect", "dolphin"],
							"answers":  [false, true, false, true],
							"guess": [false, false, false, false]
						},
						{
							"id":"3",
							"text":"Which of these mushrooms are edible",
							"type":"checkbox",
							"alternatives":["poison mushroom", "chanterelles", "portobello", "amanita muscaria"],
							"answers":  [false, true, true, false],
							"guess": [false, false, false, false]
						}
					]
				},
				{
					"id": "2",
					"imageTitle":"imageTitle 2",
					"imageText": "imageText 2",
					"imageUrl": "images/chamber.gif",
					"questions": [
						{
							"id":"1",
							"text":"Wood comes from?",
							"type":"radio",
							"alternatives": ["humans", "fishes", "trees", "birds"],
							"answers": 2,
							"guess": null
						},
						{
							"id":"2",
							"text":"1+2=?",
							"type":"radio",
							"alternatives": ["1", "3", "2", "10"],
							"answers": 1,
							"guess": null
						},
						{
							"id":"3",
							"text":"3+2=?",
							"type":"radio",
							"alternatives": ["1", "3", "2", "5"],
							"answers": 3,
							"guess": null
						}
					]
				},
				{
					"id": "3",
					"imageTitle":"imageTitle 3",
					"imageText": "imageText 3",
					"imageUrl": "images/chamber.gif",
					"questions": [
						{
							"id":"1",
							"text":"Humans descend from ?",
							"type":"radio",
							"alternatives": ["apes", "dogs", "horses", "eagles"],
							"answers": 0,
							"guess": null
						},
						{
							"id":"2",
							"text":"Which are names for bones?",
							"type":"checkbox",
							"alternatives":["clavicle", "femur", "scalp", "dandruff"],
							"answers":  [true, true, false, false],
							"guess": [false, false, false, false]
						},
						{
							"id":"3",
							"text":"Which of these are medicines",
							"type":"checkbox",
							"alternatives":["ibumetin", "paracetamol", "oil", "poison"],
							"answers":  [true, true, false, false],
							"guess": [false, false, false, false]
						}
					]
				}
			]
		}
	};

	var getImage = {
	};



  return this;

});
