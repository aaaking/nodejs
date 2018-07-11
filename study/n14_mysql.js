var async = require("async")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'test',
    port: '3306'
})

connection.connect(function (err) {
    if (err) {
        console.log("connnect mysql failed: " + err)
        return
    }
    console.log("connect success.")
})

//insert
// var userAddSql = 'insert into user (uname, pwd) values(?,?)'
// var param = ['aaa','bbb']
// connection.query(userAddSql, param, function (err, rs) {
//     if (err) {
//         console.log("insert error: " + err)
//         return
//     }
//     console.log("insert success")
// })

//query
connection.query('select * from user', function (err, rows, fields) {
    if (err) {
        console.log("query failed: " + err)
        return
    }
    console.log('The solution is: ', rows)
})

connection.end(function (err) {
    if (err) {
        console.log("end mysql failed: " + err)
        return
    }
    console.log("end success.")
})