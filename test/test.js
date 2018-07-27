var getStackTrace = function () {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};
var log = console.log;
console.log = function () {
    var stack = getStackTrace() || ""
    var line = stack.match(/\(.*?\)/g)[1] || ""
    for (var i in arguments) {
    }
    if (typeof arguments[i] == 'object') {
        arguments[i] = JSON.stringify(arguments[i])
    }
    arguments[i] += '----' + line.replace("(", "").replace(")", "")
    log.apply(console, arguments)
};
var http = require('http')
var https = require('https')
var fs = require('fs')
var path = require('path')
var url = require('url')
var parse = url.parse
var join = require('path').join
var qs = require('querystring')
// var formidable = require('formidable')
var items = []

// var Web3 = require('web3');

// npm install ethereum/web3.js --save
// web3.isConnected()　　#检查结点的连接是否存在
// web3.reset()　　#重置web3
// web3.sha3(string,options)　　#加密
// web3.toHex()　　#将任何值转为hex
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// web3.net.peerCounnt　　#连接节点的数量
// web3.eth.defaultBlock　　#默认地址
// web3.eth.getBalance()
var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
}
var server = http.createServer()
server.on('request', function (req, res) {
    // fs.writeFile("./writeFile.txt", "1")
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    // response.setHeader("powered by", "zhouzhihui")
    if (req.url == "/favicon.ico") {
        return
    }
    process.nextTick(function () {
        // if (typeof web3 !== 'undefined') {
        //     web3 = new Web3(web3.currentProvider);
        // } else {
        //     // set the provider you want from Web3.providers
        //     web3 = new Web3(new Web3.providers.HttpProvider("https://testnet.nebulas.io"));
        // }
    })
    var data = ""
    var stream = fs.createReadStream('./1.jpg')
    stream.pipe(res)
    // stream.on('data', function (chunk) {
    //     data += chunk
    // })
    // stream.on('end', function () {
    //     console.log('read data finish', data)
    //     res.end(data)
    // })
    // fs.readFile('./1.jpg', 'binary', function (err, result) {
    //     if (err) {
    //         res.end(err)
    //     } else {
    //         res.end(result, 'binary')
    //     }
    // })
    var method = req.method// + "wfafwef"
    console.log("__dirname: " + __dirname)
    var urlObj = parse(req.url)
    console.log(qs.parse(urlObj.query))//+号会变成空格
    if (urlObj.pathname == '/1.jpg') {
        var filePath = join(__dirname, urlObj.pathname)
        fs.stat(filePath, function (err, stat) {//检查文件是否存在
            if (err) {
                if (err.code == 'ENOENT') {
                    res.statusCode = 404
                    res.end('Not found')
                } else {
                    res.statusCode = 500
                    res.end("internal server error")
                }
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg;        charset=utf-8' });
                var data = ""
                var stream = fs.createReadStream(filePath)
                // req.pipe(stream)
                stream.pipe(res)
                // process.stdout.write('stdout');
                // stream.on('data', function (chunk) {
                //     data += chunk
                // })
                // stream.on('end', function () {
                //     console.log('read data finish', data)
                //     res.end(data)
                // })
                stream.on('error', function (err) {
                    res.statusCode = 500
                    res.end('internal server error')
                })
                // fs.readFile('./1.jpg', 'binary', function (err, result) {
                //     if (err) {
                //         res.end(err)
                //     } else {
                //         res.end(result, 'binary')
                //     }
                // })
            }
        })
        return
    }
    if (urlObj.pathname == '/4.8') {
        switch (method) {
            case "GET":
                show(req, res)
                break;
            case "POST":
                upload(req, res)
                break;
        }
        return
    }
    switch (method) {
        case 'POST':
            //chunk 默认是Node版的字节数组，而对于文本格式的待办事项而言，并不需要二进制数据，最好将流编码设定为ascii或utf8，这样data事件就会给出字符串
            req.setEncoding('utf8')
            var post = ''
            req.on('data', function (chunk) {
                post += chunk
            })
            req.on('end', function () {
                res.write(post)
                items.push(post)
                res.end('\n')
            })
            break;
        case 'GET':
            var body = items.map(function (item, i) {
                return i + ') ' + item
            }).join('\n')
            // res.setHeader('Content-Length', Buffer.byteLength(body))
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
            res.write(body)
            res.end('end\n')
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname
            var i = parseInt(path.slice(1), 10)
            if (isNaN(i)) {
                res.statusCode = 400
                res.end('Invalid item id\n')
            } else if (!items[i]) {
                res.statusCode = 404
                res.end('Item not found\n')
                console.log('Item not found\n')
            } else {
                items.splice(i, 1)
                res.end('OK\n')
                console.log('OK')
            }
            break;
    }
})

server.listen(8081)
console.log("server ruinning on 8081")

var httpsServer = https.createServer(options)
httpsServer.on('request', function (req, res) {
    res.end('https test')
})
httpsServer.listen(8082)
console.log("httpsServer ruinning on 8082")

var args = process.argv.splice(2)
var cmd = args.shift()
var taskDescription = args.join(' ')
var file = path.join(process.cwd(), './tasks')
console.log(cmd, taskDescription)
switch (cmd) {
    case 'list':
        listTasks(file)
        break;
    case 'add':
        addTask(file, taskDescription)
        break;
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]')
        break;
}

function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, function (exists) {
        var tasks = []
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    throw err
                }
                var data = data.toString()
                tasks = JSON.parse(data || '[]')
                cb(tasks)
            })
        } else {
            cb([])
        }
    })
}

function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, function () {
        console.log('--------------x')
        // fs.writeFile('./writeFile.txt', "智慧", {'flag': 'a'}, function (err) {
        //     console.log(err)
        // })
    })
}

function listTasks(file) {
    loadOrInitializeTaskArray(file, function (tasks) {
        for (var i in tasks) {
            console.log(tasks[i])
        }
    })
}

var aF = function () {
    return "affff"
}
console.log("aaa", "bbbb")
console.log({ "aaa": "aaav" }, "sfedf", { "xxx": "xxv" })
console.log(aF)
console.log("server ruinning on  __dirname: %s", __dirname)

function show(req, res) {
    var html = '' +
        '<form method = "post" action="/" enctype="multipart/form-data" action="./4.8">' +
        '<p><input type="text" name="name"></p>' +
        '<p><input type="file" name="file"></p>' +
        '<p><input type="submit" value="Upload"></p>' +
        '</form>'
    res.setHeader("Content-Type", "text/html")
    res.setHeader("Content-Length", Buffer.byteLength(html))
    res.end(html)
}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 404
        res.end('bad request: excepting multipart/form-data')
        return
    }
    var form = ''//new formidable.IncomingForm()
    form.parse(req)
    form.on('field', function (field, value) {//收完输入域后发出的事件
        console.log('on field')
        console.log(field)
        console.log(value)
    })
    form.on('file', function (name, file) {//接收到文件并处理好发出的事件
        console.log('on file')
        console.log(name)
        console.log(file)
    })
    form.on('progress', function (received, total) {
        var percent = Math.floor(received / total * 100)
        console.log(percent)
    })
    form.on('end', function () {
        res.end('upload complete')
    })
}

function isFormData(req) {
    var type = req.headers['content-type'] || ''
    return type.indexOf("multipart/form-data") == 0
}
