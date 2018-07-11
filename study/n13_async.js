var async = require("async")
var mysql = require("mysql")

function oneFun(cb) {
    ii = 0
    setInterval(function () {
        console.log("aaaaa")
        ii++
        var that = this
        if (ii == 3) {
            clearInterval(that)
            if (typeof cb === "function") {
                cb()
            }
        }
    }, 1000)
    console.log("oneFun")
}

function twoFun(cb) {
    jj = 0
    setInterval(function () {
        console.log("bbbb")
        jj++
        var that = this
        if (jj == 3) {
            clearInterval(that)
            if (typeof cb === "function") {
                cb()
            }
        }
    }, 1000)
    console.log("twoFun")
}

// oneFun()
// twoFun()

function exec() {
    // async.parallel({
    //     one: function (done) {
    //         oneFun(function () {
    //             done(false, "one 完毕")
    //         })
    //     },
    //     two: function (done) {
    //         twoFun(function () {
    //             done(undefined, "two 完毕")
    //         })
    //     }
    // }, function (err, rs) {
    //     console.log(err)
    //     console.log(rs)
    // })
    async.waterfall([
        function (done) {
            oneFun(function () {
                done(null, "one 完毕")
            })
        },
        function (preValue, done) {
            twoFun(function () {
                done(null, "preValue:" + preValue + "  two 完毕")
            })
        }
    ], function (err, rs) {
        console.log(err)
        console.log(rs)
    })
}

// exec()
console.log(mysql)