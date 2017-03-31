echoApp.factory('echo',function ($resource, $cookieStore) {
	
	//id should prob be user names
	
	var user = "";
	
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


  return this;

});