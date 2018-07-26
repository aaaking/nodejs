var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('index')
    res.render('index', {title: 'Express'});
});

router.get('/about', function (req, res, next) {
    console.log('about')
    res.render('about.ejs', {
        title: '饥人谷直播14班开班了',
        teacher: '若愚',
        date: '7月中旬',
        intro: 'http://jirengu.com'
    })
})

router.get('/request/:id', function (req, res, next) {
    var locals = {"name": 'yorkie', 'id': req.params.id}
    res.render('home.ejs', locals)
});

module.exports = router;
