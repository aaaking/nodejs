use simplePlatfrom
// db.stats()
db.auth("walletdb", "walletdb_1234")
//db.createCollection("delete", {name:"zzh", age:22, height:23})
//db.copyDatabase()
//db.cloneDatabase("192.168.1.83")
// show dbs
db.getName()
//db.version()
//db.runCommand({renameCollection:"yourdbname.yourcollection", to:"newdbname.yourcollection"})
//db.getCollection("dollar").findOneAndUpdate({bidId:8}, {$set: {count:0}})
//for (var item in users) {
//  print  item
//}

//db.dollar.find().forEach(function(item) {//更改数据类型
//	item.users = new Array()
//	db.dollar.save(item)
//})

//db.dollar.remove({bidId:5, totalCt:20})//条件表达�
//db.dollar.find({id: {$gte:3, $lte:14}})
//db.dollar.findOne({bidId: {$eq:24}}).users
//db.dollar.find({$or:[{type:0}, {type:1, owner: { $regex: /^.{1,}$/ }}]})
db.dollar.find({type:1}).forEach(function (item) {
	item.ownPrice = parseFloat((item.totalSum * 0.9).toFixed(8))
	db.dollar.save(item)
})
db.account.remove({nickName:{ $regex: /^.{1,}$/ }})
db.dollar.findOne({bidId:5}).users

use loteGamedb

//参数说明�//criteria：查询条�//objNew：update对象和一些更新操作符
//upsert：如果不存在update的记录，是否插入objNew这个新的文档，true为插入，默认为false，不插入�//multi：默认是false，只更新找到的第一条记录。如果为true，把按条件查询出来的记录全部更新�//例如要把User表中address字段删除
//db.account.update({},{$unset:{'bidRecord':''}},false, true)
//db.dollar.update({type:1},{$set:{'loteSpeed': new NumberInt(5)}},false, true)
//db.dollar.update({}, {$rename : {"remainct" : "remainCt"}}, false, true)

//��������Ԫ��
db.getCollection('balanceChart').update({"address":"0xc7b5f6d0245339674ae4264e44173bc606881651"}, {$set: {"chart.3.balance.0.price": 40.767206214}})

//db.getCollection("dollar").find({}).forEach(function (item) {
//  if (item.users) {
//    item.users.forEach(function(user) {
//	  	if (user.luckNums && user.luckNums.length > 0) {
//	  	  var newData = []
//	  	  newData.push(user.luckNums[0])
//	  	  if (user.luckNums.length > 1) {
//	  	  	newData.push(user.luckNums[user.luckNums.length - 1])
//	  	  }
//	  	  user.luckNums.splice(0, user.luckNums.length)
//	  	  user.luckNums.unshift(...newData)	
//	  	}
//	  	db.dollar.save(user)
//	})
//  }
//	db.dollar.save(item)
//})


//db.getCollection("account").find({}).forEach(function (item) {
//  if (item.bidRecord && item.bidRecord.length > 0) {
//    item.bidRecord.forEach(function(record) {
//      	 if (record.luckNums && record.luckNums.length > 0) {
//	  	  var newData = []
//	  	  newData.push(record.luckNums[0])
//	  	  if (record.luckNums.length > 1) {
//	  	  	newData.push(record.luckNums[record.luckNums.length - 1])
//	  	  }
//	  	  record.luckNums.splice(0, record.luckNums.length)
//	  	  record.luckNums.unshift(...newData)	
////			record.buyCnt = NumberInt(record.luckNums.length)
////			record.luckNum0 = NumberInt(record.luckNums[0])
//			
//	  	}
//	  	db.account.save(record)
//    })
//  }
//	db.account.save(item)
//})
