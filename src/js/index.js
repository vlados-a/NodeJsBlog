var signOut = require('./signOut'),
		signUp = require('./signUp');

(function($){
	$(document).ready(function(){
		signOut('#signOutButton');
		signUp('#signUpForm');
	});
})(jQuery);
