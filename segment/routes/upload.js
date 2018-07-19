var express = require("express")
var router = express.Router()
var multer = require('multer')
var fs = require("fs");//操作文件

let fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, GAMEPROJECTURL + '/public/file/' + file.fieldname)
    },
    filename: function (req, file, cb) {
        let fileAfter = (/\.[^\.]+$/.exec(file.originalname))[0]
        cb(null, file.fieldname + '-' + Date.now() + fileAfter)
    }
})
let gameUpload = multer({ storage: fileStorage }).fields([{ name: 'icon', maxCount: 1 }])
var upload = multer({
    dest: '/public/file/'
}).any();//定义图片上传的临时目录

// router.post('/', function (req, res, next) {
//     let returnData = { code: 0, msg: 'test multer' }
//     console.log(req.url)
//     console.log(req.query)
//     console.log(req.params)
//     res.json(returnData)
//     // gameUpload(req, res, function (err) {
//     //     let data = req.body
//     //     let files = req.files
//     //     console.log(data)
//     //     console.log(files)
//     //     if (err) {
//     //         console.log("router insert game img err : ", err)
//     //         returnData.code = 10002
//     //         returnData.msg = err
//     //         return res.json(returnData)
//     //     }
//     //     let uploadData = {
//     //         "gameName": data.gameName,
//     //         "introduce": data.introduce,
//     //         "gameClass": parseInt(data.gameClass),
//     //         "sort": 0,
//     //         "viewType": 1,
//     //         "grade": 0,
//     //         "gradeNum": 0,
//     //         "isChain": parseInt(data.isChain),
//     //         "gameUrl": data.gameUrl,
//     //         "creator": data.creator
//     //     }
//     //     for (let i in files) {
//     //         let file = files[i][0]
//     //         let fileUrl = file.destination + '/' + file.filename
//     //         uploadData[file.fieldname + 'Url'] = (/img\/.*/.exec(fileUrl))[0]
//     //     }
//     // })
// })

// router.post('/', upload.single('imageFile'), function (req, res, next) {
//     // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
//     // for (var i = 0; i < req.files.length; i++) {
//     //     // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
//     //     // 对临时文件转存，fs.rename(oldPath, newPath,callback);
//     //     fs.rename(req.files[i].path, "/public/file/" + req.files[i].originalname, function (err) {
//     //         if (err) {
//     //             throw err;
//     //         }
//     //         console.log('done!');
//     //     })
//     // }
//     res.writeHead(200, {
//         "Access-Control-Allow-Origin": "*"//允许跨域。。。
//     });
//     // req.body 将具有文本域数据, 如果存在的话
//     res.end(JSON.stringify(req.files) + JSON.stringify(req.body));
// })

router.post('/d', function (req, res) {
    console.log("---------访问上传路径-------------");
    /** When using the "single"
          data come in "req.file" regardless of the attribute "name". **/
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            console.log(err);
            return;
        }
        req.file = req.files[0];
        var tmp_path = req.file.path;
        console.log(tmp_path);

        /** The original name of the uploaded file
            stored in the variable "originalname". **/
        var target_path = '/public/file/' + req.file.originalname;

        /** A better way to copy the uploaded file. **/
        console.log(target_path);
        if (!fs.existsSync('/public/file/')) {
            fs.mkdirSync('/public/file/');
        }
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function () {
            res.end();
        });
        src.on('error', function (err) {
            res.end();
            console.log(err);
        });

    });
});

const pathLib = require('path');
const objMulter = multer({ dest: './public/file' });
//any表示可以接受任意文件
// router.use(objMulter.any());
router.post('/e', objMulter.any(), function (req, res) {
    //上传的文件在files里
    console.log(req.files[0])
    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
    console.log(newName)
    fs.rename(req.files[0].path, newName, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('succeed');
        }
    });
});

module.exports = router