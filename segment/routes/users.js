var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.all('/list', function (req, rep, next) {
    console.log(req.method)//GET
    console.log(req.baseUrl)// /users
    console.log(req.path)// /list

    //获取某个请求头
    console.log(req.headers['user-agent'])//
    console.log(req.get('user-agent'))//same as above

    //查询参数
    console.log(req.query)// ?后面的json对象
    console.log(req.query.id)

    //post请求的body参数
    console.log(req.body)// ?后面的json对象
    console.log(req.body.id)
    // rep.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    rep.setHeader("Content-Type", "text/plain; charset=utf-8")
    rep.send("<h1>hello</h1>hello")
})

router.get('/mm', function (req, rep, next) {
    rep.json({a: 1, b: [true, 'ok']})
})

// rest 风格
router.get('/:id', function (req, rep, next) {
    console.log(req.params.id)
    console.log(__dirname)
    rep.contentType('application/javascript')
    rep.sendFile('users.js', {root: __dirname + "/"})
    // rep.status(200).send("rest style for :id")
})

module.exports = router;
