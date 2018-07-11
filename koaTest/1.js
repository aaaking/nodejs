var KeyGrip = require("KeyGrip")
const Koa = require('koa');
const app = new Koa();

app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
//if not require KeyGrip then we can use below programm
// app.keys = ['im a newer secret', 'i like turtle'];

// const main = ctx => {
//     ctx.response.body = 'Hello World';//ctx.response代表 HTTP Response。同样地，ctx.request代表 HTTP Request。
// };
// app.use(main);

// X-Response-Time middleWare
app.use(function* (next) {
    var start = new Date()
    yield next;
    var ms = new Date - start
    this.set('X-Response-Time', ms + 'ms');
    console.log(`X-Response-Tim: ${ms}ms`)
    // console.log(next) {}
    // this.response.write(`X-Response-Tim: ${ms}ms`)
})

//logger middleWare
app.use(function* (next) {
    var start = new Date()
    yield next
    var ms = new Date() - start
    console.log('%s %s - %s', this.method, this.url, ms)
    // console.log(next) {}
    // this.write(`${ctx.method} ${ctx.url} - ${ms}`)
})

//response
app.use(function* () {
    // this -- is the Context
    // this.request -- is a koa Request
    // this.response -- is a koa Response
    // this.response.write(`X-Response-Tim: ${22}ms`)
    // console.log(this.cookies.get("name"))
    //koa deprecated Support for generators will been removed in v3. See the documentation for examples of how to convert old middleware https://github.com/koajs/koa/tree/v2.x#old-signature-middleware-v1x 1.js:9:5
    this.cookies.set('name', 'tobi', {
        signed: true
    })
    this.append("testName", "zzh")
    // this.redirect("/login")
    var controller = this.request.path
    if (controller == '/login' || controller == '/login/') {
        this.body = {
            name: "zzh",
            ip: this.ip,
            path: this.path,
            url: this.url,
            query: this.query,
            querystring: this.querystring,
        };
    } else if (controller == '/') {
        this.body = {
            name: "zzh",
            ip: this.ip,
            path: this.path,
            url: this.url,
            query: this.query,
            querystring: this.querystring,
        };
    } else {
        this.throw(404, '当前内容未找到')
    }
})

app.listen(3000);
app.listen(3001);