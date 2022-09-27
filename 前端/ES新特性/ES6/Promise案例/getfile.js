const fs = require('fs');

// 利用fs一般的方法来演示文件读取

//读取文件  err表示是否错误，data是读取的数据
fs.readFile('./aaa.txt',(err,data)=>{
    //如果失败，就提示
    if(err){
        console.log('出现错误');
    } else{
        console.log(data.toString());
    }

});

