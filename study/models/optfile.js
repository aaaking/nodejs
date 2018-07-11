var fs = require("fs")
module.exports = {
    readFile: function (path, recall) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err)
                if (typeof recall === "function") {
                    recall(err.toString())
                }
                throw err.toString();
            } else {
                console.log("readFile and get data")
                if (typeof recall === "function") {
                    recall(data.toString())
                }
            }
        })
        console.log("异步方法执行完毕！")
    },
    readFileSync: function (path) {
        var data = fs.readFileSync(path, 'utf-8')
        console.log(data)
        console.log("同步方法执行完毕")
        return data
    },
    writeFile: function (path, data, recall) {
        fs.writeFile(path, data, function (err) {
            if (err) {
                throw err;
            }
            console.log("It's saved!")
            if (typeof recall === "function") {
                recall("写入文件成功")
            }
        })
    },
    readImg: function (path, rep) {
        fs.readFile(path, "binary", function (err, file) {
            if (err) {
                console.log(err)
                return
            } else {
                console.log("readImg")
                rep.write(file, 'binary')
                rep.end()
            }
        })
    }
}