var express = require('express');
var router = express.Router();
var Article = require('../models/article'),
    HttpError = require('../libs/errors').HttpError,
    async = require('async'),
    url = require('url');

router.get('/',function(req,res,next){
    var query = url.parse(req.url, true).query;
    if(query.title){
        Article.findOne({title: query.title}, function(err, article){
            if(err) return next(err);
            res.render('articles/article', {
                article: article
            });
        });
    }
    else{
        Article.find({}, function(err, articles){
        if(err) return next(err);
        res.render("articles/articles",{
            articles: articles
        });
    })
    }

});
router.post('/',function(req,res,next){
    var query = {};
    if(req.body.title !== '') query.title = req.body.title;
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
            title: req.body.title.trim(),
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
    res.render('articles/article',{
        authorRequest: true
    });
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

router.get('/edit', function(req,res,next){
    console.log('mda');
    if(!req.user) return next(new httpError(403));
    var query = url.parse(req.url, true).query;
    Article.findOne({title: query.title}, function(err, article){
        if(err) return next(err);
        if(!article) return next(new HttpError(404));

        res.render('articles/article',{
            article: article,
            authorRequest: true
        });
    });
});
router.post('/edit', function(req, res, next){
    if(!req.user) return next(new HttpError(403));
    var query = url.parse(req.url, true).query;
    Article.findOne({title: query.title}, function(err, article){
        console.log(article.creator.toString());
        console.log(req.user._id.toString());
        if(article.creator.toString() != req.user._id.toString()) return next(new HttpError(403));

        article.title = req.body.title.trim();
        article.content = req.body.content;
        article.save();
        res.redirect('/articles/my');
    });
});
module.exports = router;
