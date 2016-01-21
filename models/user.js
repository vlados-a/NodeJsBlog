var crypto = require('crypto'),
    mongoose = require('../libs/mongoose'),
    async = require('async'),
    util = require('util'),
    HttpError = require('../libs/errors').HttpError,
    passportLocalMongoose = require('passport-local-mongoose'),
    findOrCreate = require('mongoose-findorcreate');

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

var schema = new Schema({
    firstname: String,
    lastname: String,
    birthdate: Date
});
schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate);
// schema.statics.findOrCreate = function(selector, callback){
//     User.find(selector, function (err, user) {
//         if(user) {
//             console.log(user);
//             console.log(user.get);
//             callback(err, user);
//         }
//         else{
//             User.create(selector, callback);
//         }
//     });
// }

var User = module.exports.User = mongoose.model('User', schema);
module.exports.AuthError = AuthError;
module.exports.SignUpError = SignUpError;
