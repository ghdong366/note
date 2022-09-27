const fs = require('fs');

const promise = new Promise(function (resolve, reject) {

    //异步事件
    fs.readFile('./aaa.txt', (err, data) => {

        if (err) {
            reject('读取文件失败');
        } else {
            resolve(data)
        }

    });
});
promise.then(function(data){
    console.log(data.toString());
},function(msg){
    console.log(msg);
});