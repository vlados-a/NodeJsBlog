var log = require('morgan'),
    config = require('../config'),
    connect = require('connect'),
    HttpError = require('../libs/errors').HttpError,
    commentsEmmiter = require('../libs/commentsEmmiter'),
    Article = require('../models/article');

// module.exports = function(server) {
//   var io = require('socket.io').listen(server);
//   io.set('origins', 'localhost:*');
//   io.set('logger', log);

//   io.set('authorization', function(handshake, callback) {
//     console.log('authorization');
//     async.waterfall([
//       function(callback) {
//         // сделать handshakeData.cookies - объектом с cookie
//         handshake.cookies = cookie.parse(handshake.headers.cookie || '');
//         var sidCookie = handshake.cookies[config.get('session:key')];
//         var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
//         loadSession(sid, callback);
//       },
//       function(session, callback) {
//         if (!session) {
//           callback(new HttpError(401, "No session"));
//         }

//         handshake.session = session;
//         loadUser(session, callback);
//       },
//       function(user, callback) {
//         if (!user) {
//           callback(new HttpError(403, "Anonymous session may not connect"));
//         }
//         handshake.user = user;
//         callback(null);
//       }

//     ], function(err) {
//       if (!err) {
//         return callback(null, true);
//       }

//       if (err instanceof HttpError) {
//         return callback(null, false);
//       }

//       callback(err);
//     });
//   });

//   io.sockets.on('connection', function(socket) {
//     console.log('socket connection');
//     console.log(socket);
//     var username = socket.request.user.get('username');
//     var userRoom = "user:" + username;
//     if(! io.sockets.adapter.rooms[userRoom]){
//       socket.join(userRoom);
//       socket.broadcast.emit('join', username);
//       socket.on('disconnect', function() {
//         socket.broadcast.emit('leave', username);
//       });
//     }
//     socket.on('message', function(text, cb) {
//       socket.broadcast.emit('message', username, text);
//       console.log(username);
//       cb && cb(username);
//     });

//   });

//   return io;
// };

module.exports = function(server){
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket){
        commentsEmmiter.on('comment', function(comment){
            console.log(comment);
            socket.emit('comment', comment);
        });
    });

    return io;
}