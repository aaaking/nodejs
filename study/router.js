var optfile = require('./models/optfile');
var url = require('url');
var  querystring  =  require('querystring');  //post需导入

function getRecall(req, rep) {
    rep.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    function recall(data) {
        rep.write(data)
        rep.end('<br>hello,世界<br>');//不写则没有http协议尾
    }

    return recall
}

module.exports = {
    login: function (req, rep) {
        //--------get方式接收参数----------------
        var rdata = url.parse(req.url, true).query;
        console.log(rdata);
        // if (rdata['email'] != undefined) {
        //     console.log(rdata['email']);
        //     console.log(rdata['pwd']);
        // }
        //-------post方式接收参数----------------
        var post = '';//定义了一个post变量，用于暂存请求体的信息
        req.on('data', function (chunk) {//通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            post += chunk;
        });
        //-------注意异步-------------
        req.on('end', function () {//在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            console.log("on end");
            console.log(post);
            post = querystring.parse(post);
            console.log(post);
            console.log('email:' + post['email']);
            console.log('pwd:' + post['pwd']);
            var arr = ['email', 'pwd']
            // recall = getRecall(req, rep)
            function recall(data) {
                dataStr = data.toString()
                for (var i = 0; i < arr.length; i++) {
                    re = new RegExp('{' + arr[i] + '}', 'g')// /\{name\}/g
                    dataStr = dataStr.replace(re, post[arr[i]])
                }
                rep.write(dataStr)
                rep.end()
            }
            optfile.readFile("./login.html", recall);
        });
    },
    zhuce: function (req, rep) {
        recall = getRecall(req, rep)
        optfile.readFile("/Users/zhouzhihui/codebase/gitProjects/nodejs/study/models/User.js", recall);
    },
    writeFile: function (req, rep) {
        recall = getRecall(req, rep)
        optfile.writeFile("./delete.txt", "6", recall)
    },
    showImg: function (req, rep) {
        rep.writeHead(200, {'Content-Type': 'image/jpeg'});
        optfile.readImg('/Users/zhouzhihui/codebase/gitProjects/fuwu-emacs-projects/test_ditaa.png', rep);
    }
}