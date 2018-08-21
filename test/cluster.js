var cluster = require('cluster')
var http = require('http')
var numCPUs = require('os').cpus().length
var workers = {}
var requests = 0

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        workers[i] = cluster.fork();
        (function (i) {
            workers[i].on('message', function (message) {
                if (message.cmd == 'incrementRequestTotal') {
                    requests++
                    for (var j = 0; j < numCPUs; j++) {
                        workers[j].send({cmd: 'updateOfRequestTotal', requests: requests})
                    }
                }
            })
        })(i)
    }
    cluster.on('exit', function (worker, code, singal) {
        console.log('worker ' + worker.process.pid + ' died and\ncorresponding code ' + code + "and\ningal " + singal)
    })
} else {
    process.on('message', function (message) {
        if (message.cmd == 'updateOfRequestTotal') {
            requests = message.requests
        }
    })
    http.Server(function (req, res) {
        res.writeHead(200);
        res.end('I am a worker running in process ' + process.pid + ' says cluster has responded to ' + requests + ' requests.')
        process.send({cmd: 'incrementRequestTotal'})
    }).listen(3005)
    console.log('running on server 3005 and pid ' + process.pid)
}
