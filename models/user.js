var mongoose = require('../libs/mongoose'),
    HttpError = require('../libs/errors').HttpError,
    passportLocalMongoose = require('passport-local-mongoose'),
    findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

var schema = new Schema({
    firstname: String,
    lastname: String,
    birthdate: Date
});
schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate);

var User = module.exports = mongoose.model('User', schema);
