var http = require('http')
var req = http.request({
    emthod:"POST",
    port:3333,
    headers: {
        'Content-Type':"application/json"
    }
})
req.write('[')
var n = 30
while(n--) {
    req.write('"foo,"')
}
req.write('"bar]"')
req.end()