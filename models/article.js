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

Article.methods.getAverageRating = function(){
    var avRating = 0;
    this.fans.forEach(function(e,i){
        avRating += e.star;
    });
    avRating /= this.fans.length;
    if(Number.isNaN(avRating)) return 0;
    var res = new Number(avRating);
    res = res.toPrecision(3);
    return res;
}

module.exports = mongoose.model('Article', Article);
