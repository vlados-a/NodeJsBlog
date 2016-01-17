var crypto = require('crypto'),
    mongoose = require('../libs/mongoose'),
    async = require('async'),
    util = require('util'),
    HttpError = require('../libs/errors').HttpError,
    passportLocalMongoose = require('passport-local-mongoose');

function AuthError(message){
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.message = message || "Error";
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';


function SignUpError(message){
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.message = message || "Error";
}

util.inherits(SignUpError, Error);

AuthError.prototype.name = 'SignUpError';

var Schema = mongoose.Schema;

var schema = new Schema({});
schema.plugin(passportLocalMongoose);

var User = module.exports.User = mongoose.model('User', schema);
module.exports.AuthError = AuthError;
module.exports.SignUpError = SignUpError;
