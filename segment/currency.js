var getStackTrace = function () {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};
var log = console.log;
console.log = function() {
    var stack = getStackTrace()
    var line = stack.match(/\(.*?\)/g)[1]
    arguments[0] = arguments[0] + '-------' + line.replace("(", "").replace(")", "")
    log.apply(console, arguments)
};

var a = 0.9

function aF(amount) {
    console.log("af")
    return Math.round(amount * 100) / 100
}

exports.US = function (canadian) {
    return aF(canadian * a)
}
exports.Canadian = function (us) {
    return aF(us / a)
}

// var logF = require('bin/www')
function authenticateWithDatabase(user, pass, callback) {
    var err;
    if (user != 'tobi' || pass != 'ferret') {
        err = new Error('Unauthorized');
    }
    callback(err);
}

function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));
    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);
        next();
    });
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

var port = 8083
var connect = require('connect')
var app = new connect()
app.use(function (req, res, next) {
    console.log('%s*****%s', req.method, req.url)
    next()
}).use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world')
}).use('/admin', restrict)
    .use('/admin', admin)
    .listen(port)
console.log('listen port %s', port)
console.error(process.env.NODE_ENV)