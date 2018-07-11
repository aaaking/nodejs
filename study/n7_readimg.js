var http = require("http")
var optfile = require('./models/optfile');
var router = require("./router")
var url = require("url")
http.createServer(function (req, rep) {
    rep.writeHead(200, {"Content-Type": "image/jpeg"})
    if (req.url != "/favicon.ico") {
        optfile.readImg('/Users/zhouzhihui/codebase/gitProjects/fuwu-emacs-projects/test_ditaa.png', rep);
        //------------------------------------------------
        console.log("继续执行");
    }
}).listen(8000)
console.log("server running at http://127.0.0.1:8000/")