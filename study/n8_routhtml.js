var http = require('http');
var url = require('url');
var router = require('./router');
var exception = require('./models/Exception');
http.createServer(function (request, response) {
    // response.writeHead(200,    {'Content-Type':'image/jpeg'});
    // response.writeHead(200,    {'Content-Type':'text/html; charset=utf-8'});
    if (request.url !== "/favicon.ico") {    //清除第2此访问
        pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');//替换掉前面的/
        if (router.hasOwnProperty(pathname)) {
            try {
                router[pathname](request, response);
            } catch(err) {
                console.log("hahahha " + err.toString())
            }
        } else {
            response.write("路由失败");
        }
        // response.end()
    }
}).listen(8000);
console.log('Server    running    at    http://127.0.0.1:8000/');