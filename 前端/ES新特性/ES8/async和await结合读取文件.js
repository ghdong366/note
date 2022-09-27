//1. 引入 fs 模块
const fs = require("fs");

//读取『为学』
function readA() {
    return new Promise((resolve, reject) => {
        fs.readFile("./a.txt", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readB() {
    return new Promise((resolve, reject) => {
        fs.readFile("./b.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readC() {
    return new Promise((resolve, reject) => {
        fs.readFile("./c.txt", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

//声明一个 async 函数
async function main(){
    //获取a.txt内容
    let A = await readA();
    //获取b.md内容
    let B = await readB();
    // 获取c.txt内容
    let C = await readC();

    console.log(A.toString());
    console.log(B.toString());
    console.log(C.toString());
}

main();