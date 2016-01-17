function SignOut(signOutButton){
	jQuery(signOutButton).click(function(){
		jQuery('<form method= "POST" action="/users/signout"></form>').submit();
	});
}

module.exports = SignOut;
