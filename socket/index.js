var log = require('morgan'),
    config = require('../config'),
    connect = require('connect'),
    HttpError = require('../libs/errors').HttpError,
    commentsEmmiter = require('../libs/commentsEmmiter'),
    Article = require('../models/article');

module.exports = function(server){
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket){
        commentsEmmiter.on('comment', function(comment){
            socket.emit('comment', comment);
        });
    });

    return io;
}
