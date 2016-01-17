var crypto = require('crypto'),
    mongoose = require('../libs/mongoose'),
    async = require('async'),
    util = require('util'),
    HttpError = require('../libs/errors').HttpError;

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
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptedPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update('password').digest('hex');
}

schema.virtual('password')
      .set(function(value){
        this._plainPassword = value;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptedPassword(value);
      })
      .get(function(){
        return this._plainPassword;
      });

schema.methods.checkPassword = function(password){
  return this.encryptedPassword(password) == this.hashedPassword;
}

schema.statics.authorize = function(username, password, callback){
  async.waterfall([
    function(callback){
      User.findOne({username: username},callback);
    },
    function(user, callback){
      if(user){
        console.log('find user');
        if(user.checkPassword(password)){
          console.log('Password is corrext');
          callback(null, user);
        }
        else{
          console.log('Password not corrext');
          callback(new AuthError("Incorrect password"));
        }
      }
      else{
        console.log('Not find user');
        callback(new AuthError('Incorrect username'));
      }
    }
  ], callback);
}

schema.statics.SignUp = function(username, password, callback){
  async.waterfall([
    function(callback){
      User.findOne({username: username}, callback);
    },
    function(user, callback){
      if(user){
        callback(new SignUpError("User with this name already exists"));
      }
      else{
        var user = new User({username: username, password: password});
        user.save(function(err, u){
          if(err) return callback(err);
          console.log('Create and save user');
          callback(null, user)
        });
      }
    }
  ],callback);
}

var User = module.exports.User = mongoose.model('User', schema);
module.exports.AuthError = AuthError;
module.exports.SignUpError = SignUpError;
