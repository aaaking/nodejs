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
// require('url').parse("http://localhost:3000/1?key=234&pwd=we")
// Url {
//     protocol: 'http:',
//         slashes: true,
//         auth: null,
//         host: 'localhost:3000',
//         port: '3000',
//         hostname: 'localhost',
//         hash: null,
//         search: '?key=234&pwd=we',
//         query: 'key=234&pwd=we',
//         pathname: '/1',
//         path: '/1?key=234&pwd=we',
//         href: 'http://localhost:3000/1?key=234&pwd=we' }
