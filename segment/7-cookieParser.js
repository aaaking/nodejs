// var ddfwef = require('./app');
var connect = require('connect')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan');
// var query = require('query')
var app2 = connect()
    .use(cookieParser('tobi is a cool ferret'))
    .use(bodyParser.urlencoded())
    .use(bodyParser.json())
    .use(logger('dev'))
    // .use(connect.limit('32kb'))
    .use('/getcookie', function (req, res) {
        var username = req.cookies['username'];
        if (username) {
            return res.end(username);
        }
        return res.end('No cookie found');
    })
    .use('/setcookie', function (req, res) {
        // setting cookies
        req.cookies['username'] = 'john doe'//, {maxAge: 900000, httpOnly: true});
        return res.end(req.cookies['username']);
    })
    .use(function (req, res) {
        // console.log(req.cookies)
        // console.log(req.signedCookies)
        console.log('headers', req.headers['content-type'] || 'content-type')
        console.log('query', req.query)
        res.end(JSON.stringify(req.body))
    }).listen(3333)
console.log('listen 3333')