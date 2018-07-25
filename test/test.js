var http = require('http')
var fs = require('fs')

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