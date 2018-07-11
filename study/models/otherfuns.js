//-------------------models/otherfuns.js--------------------------
function  controller(req,res){
    res.write("发送");
    call('hello',req,res);
    res.end("");
}
function  call(res){
    console.log('call');
}
module.exports  =  controller;    //只支持一个函数

/*
//支持多个函数
module.exports={
    getVisit:function(){
    return  visitnum++;
    },
    add:function(a,b){
    return  a+b;
    }
}
*/