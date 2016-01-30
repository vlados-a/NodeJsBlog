function SignOut(signOutButton, $){
    if(! $) $ = jQuery;
    if(! $) return false;
	$(signOutButton).click(function(){
		$('<form method= "POST" action="/users/signout"></form>').submit();
	});
}

module.exports = SignOut;
