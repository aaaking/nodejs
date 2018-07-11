var http = require("http")
var optfile = require('./models/optfile');
var router = require("./router")
var url = require("url")
http.createServer(function (req, rep) {
    rep.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    if (req.url != "/favicon.ico") {
        // rep.write("<script>alert('" +"登录名:zzh" + "密码:zzh" + "')</script>");
        // function recall(data) {
        //     rep.write(data)
        //     rep.end('<br>hello,世界<br>');//不写则没有http协议尾
        // }
        // optfile.readFile("/Users/zhouzhihui/codebase/gitProjects/nodejs/study/models/User.js", recall);
        // // optfile.readFileSync("/Users/zhouzhihui/codebase/gitProjects/nodejs/study/models/User.js");
        // console.log("after read file")
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
    }
}).listen(8000)
console.log("server running at http://127.0.0.1:8000/")