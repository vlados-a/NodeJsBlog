var express = require('express');
var router = express.Router();
var Article = require('../models/article'),
    HttpError = require('../libs/errors').HttpError,
    async = require('async');

router.get('/',function(req,res,next){
    Article.find({}, function(err, articles){
        if(err) return next(err);
        res.render("articles/articles",{
            articles: articles
        });
    })
});
router.post('/',function(req,res,next){
    var query = {};
    if(req.body.title !== '') query.title = req.body.title;
    console.log('Send query: %j', query);
    Article.find(query).populate('creator')
    .exec(function(err, articles){
        console.log('receive some results');
        if(err) return next(err);
        if(req.body.author === ''){
            res.render("articles",{
                articles: articles
            });
        }
        else{
            var a = [];
            console.log(articles);
            for(var i = 0, l = articles.length; i < l; i++){
                if(articles[i].creator && articles[i].creator.username == req.body.author){
                    a.push(articles[i]);
                }
            }
            res.render("articles/articles", {
                articles: a
            });
        }

    });
});

router.get('/my',function(req,res,next){
    if(!req.user) return next(new HttpError(403));

    Article.find({
        creator: req.user._id
    }, function(err, articles){
        res.render("articles/articles", {
            articles: articles,
            authorRequest: true
        });
    });
});
router.post('/my',function(req,res,next){
    if(!req.user) return next(new HttpError(403));
    if(req.body.title === '') res.redirect('/my');
    else{
        Article.find({
            title: req.body.title,
            creator: req.user._id
        }, function(err, articles){
                res.render("articles/articles",{
                    articles: articles,
                    authorRequest: true
                })
        });
    }
})

router.get('/create', function(req, res, next){
    if(!req.user) return next(new HttpError(403));
    res.render('articles/article');
});

router.post('/create', function(req, res, next){
    if(!req.user) return next(new HttpError(403));

    Article.create({
        title: req.body.title,
        content: req.body.content,
        creator: req.user._id
    },function(err, article){
        if(err) return next(err);

        res.redirect('/articles/my');
    });
});
module.exports = router;
