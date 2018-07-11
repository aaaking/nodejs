var http = require('http');
// var  User  =  require('./models/User');
var Teacher = require('./models/Teacher');
var app = http.createServer(function (request, response) {
    // setTimeout(function () {
    //
    // }, 1000)
    response.setHeader("Content-Type", "text/html; charset=utf-8")
    // response.setHeader("powered by", "zhouzhihui")
    response.writeHead(200, {'Content-Type': 'text/html;        charset=utf-8'});
    if (request.url !== "/favicon.ico") {        //清除第2此访问
        // teacher = new Teacher(1, '李四', 30);
        // teacher.teach(response);
        // response.end('');
        teacher = new Teacher()
        teacher.id = 1;
        teacher.name = "zhangsan"
        teacher.age = 22;
        teacher.teach(response)
        console.log(teacher)
        response.end()
    }
})
app.listen(8000);
console.log('Server        running        at        http://127.0.0.1:8000/');