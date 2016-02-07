var passport = require('passport'),
    User = require('../models/user'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('../libs/mongoose'),
    config = require('../config'),
    FacebookStrategy = require('passport-facebook').Strategy,
    VkontakteStrategy = require('passport-vkontakte').Strategy;

//Set up Local authentication strategy

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new FacebookStrategy(
    {
        clientID: config.get('social:facebook:clientId'),
        clientSecret: config.get('social:facebook:clientSecret'),
        callbackURL: config.get('social:facebook:callbackURL')
    },
    function(accessToken, refreashToken, profile, done){
        User.findOrCreate({username: profile.displayName}, done);
    }
));
passport.use(new VkontakteStrategy(
    {
        clientID: config.get('social:vk:clientId'),
        clientSecret: config.get('social:vk:clientSecret'),
        callbackURL: config.get('social:vk:callbackURL')
    },
    function(accessToken, refreashToken, profile, done){
        User.findOrCreate({username: profile.displayName}, done);
    }
));

module.exports = passport;
