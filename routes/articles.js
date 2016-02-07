var express = require('express');
var router = express.Router();
var Article = require('../models/article'),
    HttpError = require('../libs/errors').HttpError,
    async = require('async'),
    commentsEmmiter = require('../libs/commentsEmmiter'),
    url = require('url');

router.get('/',function(req,res,next){
    var query = url.parse(req.url, true).query;
    if(query.title){
        Article.findOne({title: query.title})
                .populate('comments.creator')
                .exec(function(err, article){
                    if(err) return next(err);
                    res.render('articles/fullArticle', {
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
        if(err) return next(err);
        if(req.body.author === ''){
            res.render("articles",{
                articles: articles
            });
        }
        else{
            var a = [];
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

router.post('/addComment', function(req, res, next){
    if(!req.user) return next(new HttpError(403));
    var query = url.parse(req.url, true).query;
    if(query.title){
        Article
            .findOne({title: query.title})
            .populate('comments.creator')
            .exec(function(err, article){
                if(err) return next(err);
                var comment = {
                    text: req.body.commentText,
                    creator: req.user._id
                };
                article.comments.push(comment);
                article.save();
                if(req.xhr) res.status(200).send(comment);
                else res.redirect('/articles?title='+query.title);
                commentsEmmiter.emit('comment', comment);
        });
    }
    else{
        if(req.xhr) res.status(500).send({});
        else next(new httpError(404));
    }
})

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
        if(article.creator.toString() != req.user._id.toString()) return next(new HttpError(403));

        article.title = req.body.title.trim();
        article.content = req.body.content;
        article.save();
        res.redirect('/articles/my');
    });
});

router.get('/delete', function(req, res, next){
    if(!req.user) return next(new HttpError(403));
    var query = url.parse(req.url, true).query;
    Article.findOne({title: query.title}, function(err, article){
        if(article.creator.toString() != req.user._id.toString()) return next(new HttpError(403));
        article.remove();
        res.redirect('/articles/my');
    });
})
router.post('/rate', function(req, res, next){
    if(!req.user){
        if(req.xhr) return res.status(403).send({});
        return next(new HttpError(403));
    }
    Article.findOne({title: req.body.title}, function(err, article){
        if(err){
            if(req.xhr) return res.status(500).send({});
            return next(new HttpError(500));
        }
        if(! article){
            if(req.xhr) return res.status(404).send({});
            return next(new HttpError(404));
        }
        if(article.creator && (article.creator.toString() === req.user._id.toString())){
            res.status(403).send({});
        }
        else{
            for(var i = 0, l = article.fans.length; i < l; i++){
                if(req.body.rating == article.fans[i].fan){
                    article.fans[i].star = req.body.rating;
                    article.save();
                    return res.send({});
                }
            }
            article.fans.push({
                star: req.body.rating,
                fan: req.user._id
            });
            article.save();
            res.status(200).send({});
        }
    });
});
module.exports = router;
