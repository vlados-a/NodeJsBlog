var signOut = require('./signOut'),
		signUp = require('./signUp'),
        rating = require('./rating');

(function($){
	$(document).ready(function(){
		signOut('#signOutButton');
		signUp('#signUpForm');
        rating('#rating', $('#articleTitle').text());
	});
})(jQuery);
