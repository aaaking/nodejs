var events = require('events')
var util = require('util')
var net = require('net')
var fs = require('fs')
var EventEmitter = events.EventEmitter
var channel = new EventEmitter()
channel.setMaxListeners(50)
channel.clients = {}
channel.subscriptions = {}

channel.on('join', function (id, client) {
    this.clients[id] = client
    this.subscriptions[id] = function (senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message)
        }
    }
    this.on('broadcast', this.subscriptions[id])
    var welcomeStr = id + ' joined and total online number: ' + this.listeners('broadcast').length
    client.write(welcomeStr)
    channel.emit('broadcast', id, welcomeStr)
})

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id])
    channel.emit('broadcast', id, id + ' has left the chat and total online number: ' + this.listeners('broadcast').length + '.\n')
})

channel.on('shutdown', function () {
    channel.emit('broadcast', '', 'Chat has shut down!\n')
    channel.removeAllListeners('broadcast')
    console.log('shutdown------------------------')
})

channel.on('error', function (err) {
    console.log(err)
})

//deprecated
process.on('uncaughtException', function (err) {
    console.log(err)
    process.exit(1)
})

//扩展事件监听器：文件监视器
function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir
    this.processedDir = processedDir
}
util.inherits(Watcher, EventEmitter)//等价于Watcher.prototype = new EventEmitter()
var watchDir = './watch'
var processedDir = './done'
Watcher.prototype.watch = function () {
    var watcher = this
    fs.readdir(this.watchDir, function (err, files) {
        if (err) {
            throw err
        }
        for (var index in files) {
            watcher.emit('process', files[index])
        }
    })
}
Watcher.prototype.start = function () {
    var watcher = this
    fs.watchFile(watchDir, function () {
        watcher.watch()
    })
}
var watcher = new Watcher(watchDir, processedDir)
watcher.on('process', function process(file) {
    var watchFile = this.watchDir + '/' + file
    var processedFile = this.processedDir + '/' + file.toLowerCase()
    fs.rename(watchFile, processedFile, function (err) {
        if (err) {
            throw err
        }
    })
})
watcher.start()

function asyncFunc(cb) {
    setTimeout(cb, 300)
}
var color = { a: { a: "hello", b: 21 }, b: "bb" };
(function (colorP) {
    asyncFunc(function () {
        console.log('color: ', colorP)
    })
})(JSON.parse(JSON.stringify(color)))
color.a.a = "changed";
color.b = "b changed";

var exec = require('child_process').exec
function downloadNodeVersion() {
    var url = 'http://nodejs.org/dist/node-v0.4.7.tar.gz'
    var file = './done/0.4.7.tgz'
    exec('curl ' + url + ' >' + file, (a, b) => {
        console.log(a)
        console.log(b)
    })
}
// downloadNodeVersion()









var server = net.createServer(function (client) {
    var id = client.remoteAddress + ":" + client.remotePort
    console.log(id)
    channel.emit('join', id, client)
    client.on('data', function (data) {
        data = data.toString()
        if (data == 'shutdown') {
            channel.emit('shutdown')
        }
        channel.emit('broadcast', id, data)
    })
    //
    client.on('close', function () {
        channel.emit('leave', id)
    })
})
server.listen(1233)