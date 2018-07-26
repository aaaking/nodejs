var http = require('http')
var https = require('https')
var fs = require('fs')
var path = require('path')

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
    res.writeHead(200, { 'Content-Type': 'image/jpeg;        charset=utf-8' });
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