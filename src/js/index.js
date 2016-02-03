var signOut = require('./signOut'),
		signUp = require('./signUp'),
        rating = require('./rating'),
        comments = require('./comments');

(function($){
	$(document).ready(function(){
		signOut('#signOutButton');
		signUp('#signUpForm');
        rating('#rating', $('#articleTitle').text());
        comments('#commentsBlock','#commentsForm');
	});
})(jQuery);
