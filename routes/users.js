var express = require('express');
var router = express.Router();

var HttpError = require('../libs/errors').HttpError,
    SignUpError = require('../models/user').SignUpError,
    User = require('../models/user').User,
    passport = require('../libs/passport');

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

router.post('/signin',  passport.authenticate('local'), function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  res.redirect('/');
});

router.post('/signup',function(req, res, next){
  var username = req.body.username,
      password = req.body.password;
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('user/signUp');
        }

        passport.authenticate('local')(req, res, function () {
          req.user ? console.log('ok') : console.log('fail');
          res.redirect('/');
        });
    });

});

router.post('/signout',function(req,res,next){
  req.logout();
  res.redirect('/');
});

module.exports = router;
