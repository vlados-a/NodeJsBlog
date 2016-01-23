var express = require('express');
var router = express.Router();

var HttpError = require('../libs/errors').HttpError,
    SignUpError = require('../models/user').SignUpError,
    User = require('../models/user'),
    passport = require('../libs/passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},function(err, users){
      if(err) return next(err);
      res.render("user/users", {users: users});
  });
});

router.get('/signin', function(req,res,next){
    res.render("user/signIn");
});

router.get('/signup', function(req, res, next){
    res.render("user/signUp");
})

router.post('/signin',  passport.authenticate('local'), function(req, res) {
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

router.get('/account',function(req,res,next){
    if(!req.user) return next(new HttpError(403));
    User.findOne({username: req.user.username}, function(err,user){
        if(err) return next(err);
        var userInfo = {};
        userInfo.firstname = (user.firstname) ? user.firstname : '';
        userInfo.lastname = (user.lastname) ? user.lastname : '';
        userInfo.birthdate = (user.birthdate) ? user.birthdate: new Date(1995,9,19);
        console.log(userInfo);
        function Convert(date){
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()).toString();
            var dd  = date.getDate().toString();
            return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
        }
        userInfo.birthdate = Convert(userInfo.birthdate);
        console.log(userInfo.birthdate);
        res.render("user/account",{userInfo: userInfo});
    });
});

router.post('/account', function(req,res,next){
    if(!req.user) return next(new HttpError(403));
    var birthdate = new Date(req.body.birthdate);
    birthdate.setMonth(birthdate.getMonth() + 1);
    var updates = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: birthdate
    };
    User.update({username: req.user.username}, updates, function(err, user){
        if(err) return next(err);
        console.log(user);
        res.render("index");
    });
});

router.post('/delete',function(req,res,next){
    User.remove({username: req.user.username}, function(err, removed){
        if(err) return next(err);
        req.user = null;
        res.redirect('/users/signin');
    });
});
module.exports = router;
