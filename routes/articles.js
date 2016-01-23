var express = require('express');
var router = express.Router();
var Article = require('../models/article'),
    async = require('async');

router.get('/',function(req,res,next){
    Article.find({}, function(err, articles){
        if(err) return next(err);
        res.render("articles",{
            articles: articles
        });
    })
});

module.exports = router;
