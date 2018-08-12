//Most middleware (like favicon) is no longer bundled with Express and must be installed separately.
// Please see https://github.com/senchalabs/connect#middleware.
var getStackTrace = function () {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};
var log = console.log;
console.log = function () {
  var stack = getStackTrace() || ""
  var matchResult = stack.match(/\(.*?\)/g) || []
  var line = matchResult[1] || ""
  for (var i in arguments) {
  }
  if (typeof arguments[i] == 'object') {
    arguments[i] = JSON.stringify(arguments[i])
  }
  arguments[i] += '----' + line.replace("(", "").replace(")", "")
  log.apply(console, arguments)
};

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//设置模板引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
