var express = require('express');
var router = express.Router();

var HttpError = require('../libs/errors').HttpError,
    SignUpError = require('../models/user').SignUpError,
    User = require('../models/user').User;

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

router.post('/signup',function(req, res, next){
  var username = req.body.username,
      password = req.body.password;
  User.SignUp(username, password, function(err,user){
    if(err){
      if(err instanceof SignUpError) next(new HttpError(401,"User with such name already exists"));
      return next(err);
    }
    console.log('success');
    req.session.user = user._id;
    res.redirect("/");
  })
});

router.post('/signout',function(req,res,next){
	req.session.destroy();
  res.redirect("/users/signin");
});

module.exports = router;
