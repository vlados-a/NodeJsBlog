var express = require('express');
var router = express.Router();

var HttpError = require('../libs/errors').HttpError;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', function(req,res,next){
	res.render("user/signIn");
});

router.get('/signup', function(req, res, next){
	res.render("user/signUp");
})

router.post('/signout',function(req,res,next){
	next(new HttpError(404));
});

module.exports = router;
