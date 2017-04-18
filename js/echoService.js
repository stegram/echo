echoApp.factory('echo',function ($resource, $cookieStore) {
	
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
		return user;
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


  return this;

});