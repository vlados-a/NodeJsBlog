var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var articles = require('./routes/articles');

var config = require('./config'),
    sessionLib = require('./libs/sessionStorage'),
    session = sessionLib.session,
    sessionStore = sessionLib.sessionStore,
    passport = require('./libs/passport'),
    HttpError = require('./libs/errors').HttpError;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  saveUninitialized: false,
  resave: false,
  store: sessionStore
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middleware/loadUser'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//custom errorHandler
//handles 403,404,500 errors
app.use(require('./libs/errorHandler'));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors/default', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('errors/default', {
    message: err.message,
    error: {}
  });
});

var http = require('http').Server(app);
var server = http.listen(config.get('port'), function(){
  console.log('Application is listening port %s', config.get('port'));
});

var io = require('./socket')(server);
app.set('io', io);

module.exports = app;
