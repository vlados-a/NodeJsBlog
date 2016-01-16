var express = require('express');
var router = express.Router();

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

module.exports = router;
