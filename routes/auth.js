var express = require('express');
var router = express.Router();
var passport = require('../libs/passport');

router.get('/facebook', passport.authenticate('facebook'), function(req, res){

});
router.get('/facebook/callback',
		passport.authenticate('facebook',
		{ failureRedirect: '/signin' }),
  		function(req, res) {
    		res.redirect('/');
  		});

router.get('/vk', passport.authenticate('vkontakte'), function(req, res){
	console.log('works');
});
router.get('/vk/callback',
		passport.authenticate('vkontakte',
		{ failureRedirect: '/signin' }),
  		function(req, res) {
    		res.redirect('/');
  		});

module.exports = router;
