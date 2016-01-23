var mongoose = require('../libs/mongoose'),
    HttpError = require('../libs/errors').HttpError,
    findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

var Article = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    comments:[{
        text: String,
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = mongoose.model('Article', Article);
