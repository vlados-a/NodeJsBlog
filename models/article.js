var mongoose = require('../libs/mongoose'),
    HttpError = require('../libs/errors').HttpError,
    findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

var Article = new Schema({
    creator: {
        type: 'ObjectId',
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: String,
    fans:[{
        star:{
            type:Number,
            min: 1,
            max: 5
        },
        fan:{
            type: 'ObjectId',
            ref: 'User'
        }
    }],
    comments:[{
        text: String,
        creator:{
            type: 'ObjectId',
            ref: 'User'
        }
    }]
});

module.exports = mongoose.model('Article', Article);
