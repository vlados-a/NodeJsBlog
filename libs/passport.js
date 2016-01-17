var passport = require('passport'),
    User = require('../models/user').User,
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('../libs/mongoose');

//Set up Local authentication strategy

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
