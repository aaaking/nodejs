var http = require("http")
var url = require("url")
var router = require("./router")
http.createServer(function (req, rep) {
    rep.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    if (req.url != "/favicon.ico") {
        rep.write("hello")
        console.log(req.url)//包含？&
        var pathname = url.parse(req.url).pathname;
        console.log(pathname);//去掉？&
        pathname = pathname.replace(/\//, '');//替换掉前面的/
        console.log(pathname);//包含最前面的/
        if (router.hasOwnProperty(pathname)) {
            router[pathname](req, rep);
        } else {
            rep.write("路由失败");
        }
        rep.end('');
    }
}).listen(8000)
console.log("server running on port 8000...")